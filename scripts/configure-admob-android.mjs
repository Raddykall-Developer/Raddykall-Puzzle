import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const appId = 'ca-app-pub-4734289088559656~8247805380';
const manifestPath = 'android/app/src/main/AndroidManifest.xml';
const stringsPath = 'android/app/src/main/res/values/strings.xml';

let manifest = await readFile(manifestPath, 'utf8');
const metaName = 'com.google.android.gms.ads.APPLICATION_ID';
if (manifest.includes(metaName)) {
  manifest = manifest.replace(/<meta-data\s+android:name="com\.google\.android\.gms\.ads\.APPLICATION_ID"[\s\S]*?\/>/m,
    '        <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="@string/admob_app_id" />');
} else {
  if (!manifest.includes('</application>')) throw new Error('AndroidManifest.xml has no closing application element.');
  manifest = manifest.replace('</application>',
    '        <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="@string/admob_app_id" />\n    </application>');
}
await writeFile(manifestPath, manifest, 'utf8');

let strings = '';
try {
  strings = await readFile(stringsPath, 'utf8');
} catch {
  await mkdir(dirname(stringsPath), { recursive: true });
  strings = '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n</resources>\n';
}
if (/<string\s+name="admob_app_id">[\s\S]*?<\/string>/.test(strings)) {
  strings = strings.replace(/<string\s+name="admob_app_id">[\s\S]*?<\/string>/,
    '<string name="admob_app_id">' + appId + '</string>');
} else {
  if (!strings.includes('</resources>')) throw new Error('strings.xml has no closing resources element.');
  strings = strings.replace('</resources>', '    <string name="admob_app_id">' + appId + '</string>\n</resources>');
}
await writeFile(stringsPath, strings, 'utf8');
if (!manifest.includes(metaName) || !strings.includes(appId)) throw new Error('Could not configure the AdMob application ID.');
console.log('Configured the supplied AdMob application ID in AndroidManifest.xml and strings.xml.');
