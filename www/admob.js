import { Capacitor } from '@capacitor/core';
import { AdMob, AdmobConsentStatus, BannerAdPluginEvents, BannerAdPosition, BannerAdSize, MaxAdContentRating } from '@capacitor-community/admob';

const APP_BANNER_ID = 'ca-app-pub-4734289088559656/4455277910';
// Google's official Android banner test unit; replace only for release after device testing.
const GOOGLE_TEST_BANNER_ID = 'ca-app-pub-3940256099942544/9214589741';
const USE_TEST_ADS = import.meta.env.VITE_ADMOB_TEST_ADS !== 'false';
let sdkInitialized = false;
let listenersRegistered = false;
let bannerLoadInProgress = false;
let retryTimer = null;
let actualBannerHeight = 50;

const isAndroid = () => Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android';
function setBannerSpace(height = actualBannerHeight) {
  actualBannerHeight = Math.max(0, Number(height) || 50);
  document.documentElement.style.setProperty('--admob-banner-height', actualBannerHeight + 'px');
}
function publishPrivacyOptionsRequirement(info) {
  const required = info?.privacyOptionsRequirementStatus === 'REQUIRED';
  window.__raddykallAdmobPrivacyRequired = required;
  window.dispatchEvent(new Event('raddykall:admob-privacy-required'));
}
function handleBannerLoaded() {
  document.body.classList.add('admob-banner-active');
  setBannerSpace(actualBannerHeight || 50);
  console.info('[Raddykall AdMob] Banner loaded', { test: USE_TEST_ADS, height: actualBannerHeight });
}
function handleBannerSizeChanged(info) {
  if (info?.height > 0) setBannerSpace(info.height);
  document.body.classList.add('admob-banner-active');
  console.info('[Raddykall AdMob] Banner size', info);
}
function handleBannerFailed(error) {
  document.body.classList.remove('admob-banner-active');
  console.error('[Raddykall AdMob] Banner failed to load:', error);
  scheduleRetry();
}
function scheduleRetry() {
  if (!isAndroid() || retryTimer) return;
  retryTimer = window.setTimeout(() => {
    retryTimer = null;
    void showBannerAfterConsent();
  }, 15000);
}
async function registerBannerListeners() {
  if (listenersRegistered) return;
  // Register before showBanner so fast responses/errors cannot be missed.
  await Promise.all([
    AdMob.addListener(BannerAdPluginEvents.Loaded, handleBannerLoaded),
    AdMob.addListener(BannerAdPluginEvents.SizeChanged, handleBannerSizeChanged),
    AdMob.addListener(BannerAdPluginEvents.FailedToLoad, handleBannerFailed),
  ]);
  listenersRegistered = true;
}
async function showBannerAfterConsent() {
  if (!isAndroid() || bannerLoadInProgress) return;
  bannerLoadInProgress = true;
  document.body.classList.add('admob-native');
  try {
    let consentInfo = await AdMob.requestConsentInfo();
    if (consentInfo.status === AdmobConsentStatus.REQUIRED && consentInfo.isConsentFormAvailable) {
      consentInfo = await AdMob.showConsentForm();
    }
    publishPrivacyOptionsRequirement(consentInfo);
    if (!consentInfo.canRequestAds) {
      document.body.classList.remove('admob-banner-active');
      console.info('[Raddykall AdMob] Waiting for consent; ads are not allowed yet.');
      return;
    }
    if (!sdkInitialized) {
      await AdMob.initialize({ maxAdContentRating: MaxAdContentRating.General });
      sdkInitialized = true;
    }
    await registerBannerListeners();
    setBannerSpace(actualBannerHeight);
    // Adaptive banners calculate a suitable width/height for the device; reserve space from the size event.
    await AdMob.showBanner({
      adId: USE_TEST_ADS ? GOOGLE_TEST_BANNER_ID : APP_BANNER_ID,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: USE_TEST_ADS,
    });
  } catch (error) {
    document.body.classList.remove('admob-banner-active');
    console.error('[Raddykall AdMob] Banner initialization/show failed:', error);
    scheduleRetry();
  } finally {
    bannerLoadInProgress = false;
  }
}
async function openPrivacyOptions() {
  if (!isAndroid()) return;
  try {
    await AdMob.showPrivacyOptionsForm();
    await AdMob.hideBanner();
    document.body.classList.remove('admob-banner-active');
    if (retryTimer) { clearTimeout(retryTimer); retryTimer = null; }
    void showBannerAfterConsent();
  } catch (error) {
    console.error('[Raddykall AdMob] Could not open privacy options:', error);
  }
}
window.addEventListener('raddykall:show-admob-privacy-options', () => { void openPrivacyOptions(); });
function startAdMob() {
  if (!isAndroid()) return;
  document.body.classList.add('admob-native');
  void showBannerAfterConsent();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startAdMob, { once: true });
else startAdMob();
