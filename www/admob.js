import { Capacitor } from '@capacitor/core';
import {
  AdMob,
  AdmobConsentStatus,
  BannerAdPluginEvents,
  BannerAdPosition,
  BannerAdSize,
  MaxAdContentRating,
} from '@capacitor-community/admob';

const APP_BANNER_ID = 'ca-app-pub-4734289088559656/4455277910';
const GOOGLE_TEST_BANNER_ID = 'ca-app-pub-3940256099942544/9214589741';
// Live ads are disabled by default in local/debug builds. The release workflow can opt in with VITE_ADMOB_TEST_ADS=false.
const USE_TEST_ADS = import.meta.env.VITE_ADMOB_TEST_ADS !== 'false';
let sdkInitialized = false;
let listenersRegistered = false;
let bannerLoadInProgress = false;

const isAndroid = () => Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android';

function publishPrivacyOptionsRequirement(info) {
  const required = info?.privacyOptionsRequirementStatus === 'REQUIRED';
  window.__raddykallAdmobPrivacyRequired = required;
  window.dispatchEvent(new Event('raddykall:admob-privacy-required'));
}

function handleBannerLoaded() {
  document.body.classList.add('admob-banner-active');
}

function handleBannerFailed(error) {
  document.body.classList.remove('admob-banner-active');
  console.warn('[Raddykall AdMob] Banner failed to load:', error);
}

async function registerBannerListeners() {
  if (listenersRegistered) return;
  listenersRegistered = true;
  await AdMob.addListener(BannerAdPluginEvents.Loaded, handleBannerLoaded);
  await AdMob.addListener(BannerAdPluginEvents.FailedToLoad, handleBannerFailed);
}

async function showBannerAfterConsent() {
  if (!isAndroid() || bannerLoadInProgress) return;
  bannerLoadInProgress = true;
  try {
    let consentInfo = await AdMob.requestConsentInfo();
    if (consentInfo.status === AdmobConsentStatus.REQUIRED && consentInfo.isConsentFormAvailable) {
      consentInfo = await AdMob.showConsentForm();
    }

    publishPrivacyOptionsRequirement(consentInfo);
    if (!consentInfo.canRequestAds) {
      document.body.classList.remove('admob-banner-active');
      return;
    }

    if (!sdkInitialized) {
      await AdMob.initialize({ maxAdContentRating: MaxAdContentRating.General });
      sdkInitialized = true;
    }

    await registerBannerListeners();
    const options = {
      adId: USE_TEST_ADS ? GOOGLE_TEST_BANNER_ID : APP_BANNER_ID,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: USE_TEST_ADS,
    };
    // Reserve the bottom area before displaying the native overlay so touch controls are not covered.
    document.body.classList.add('admob-banner-active');
    await AdMob.showBanner(options);
  } catch (error) {
    document.body.classList.remove('admob-banner-active');
    console.warn('[Raddykall AdMob] Ads remain disabled after an initialization/consent error:', error);
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
    await showBannerAfterConsent();
  } catch (error) {
    console.warn('[Raddykall AdMob] Could not open privacy options:', error);
  }
}

window.addEventListener('raddykall:show-admob-privacy-options', () => {
  void openPrivacyOptions();
});

function startAdMob() {
  if (!isAndroid()) return;
  void showBannerAfterConsent();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startAdMob, { once: true });
} else {
  startAdMob();
}
