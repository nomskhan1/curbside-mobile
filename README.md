# Curbside Valet — Mobile App (Android + iOS)

This wraps your existing live web app (https://curbside-valet.vercel.app) in a real native app
shell using Capacitor. It's the same backend, same database, same login — just packaged as an
installable Android/iOS app. This is the fastest, most reliable path since your app already works
and is already deployed.

## Before you start

1. **Edit `capacitor.config.ts`** — make sure `PRODUCTION_URL` matches your actual live Vercel URL exactly.
2. Make sure you have **Node.js** installed (same as the main valet-app project).

---

## PART 1: Android (no Mac needed — works fully on Windows)

### 1. Install Android Studio
Download from **https://developer.android.com/studio** and install it. During setup, let it install the Android SDK (it'll prompt you — just accept the defaults).

### 2. Install project dependencies
In this `curbside-mobile` folder:
```bash
npm install
```

### 3. Add the Android platform
```bash
npx cap add android
```
This generates a full native Android project in an `android/` folder.

### 4. Sync your config into it
```bash
npx cap sync android
```

### 5. Open it in Android Studio
```bash
npx cap open android
```
This launches Android Studio with your project loaded. Give it a few minutes the first time — it downloads some additional build tools.

### 6. Test it
- Plug in an Android phone via USB (enable "Developer options" → "USB debugging" on the phone first — search "enable USB debugging [your phone model]" if unsure), or use Android Studio's built-in emulator
- Click the green **Run ▶** button in Android Studio
- The app should launch and load your live site

### 7. Build a release version for the Play Store
1. In Android Studio: **Build → Generate Signed Bundle / APK**
2. Choose **Android App Bundle (AAB)** — this is what Google Play wants
3. It'll ask you to create a **keystore** (a signing key) — click "Create new", fill in the form, and **save the keystore file and its passwords somewhere safe and permanent**. If you lose this, you can never update your app again under the same listing.
4. Finish the wizard — it produces a `.aab` file

### 8. Create your Google Play Console account
1. Go to **https://play.google.com/console**
2. Pay the one-time $25 registration fee
3. Create a new app listing — fill in name, description, screenshots (you can take these from the emulator), privacy policy URL (required — even a simple one-page one works), and content rating questionnaire
4. Upload your `.aab` file under "Production" (or start with "Internal testing" to try it privately first — recommended)
5. Submit for review (typically a few hours to a couple days)

---

## PART 2: iOS (requires a Mac — here's how to do it without owning one)

Since you don't have a Mac, you have two practical options:

### Option A: Cloud Mac build service (recommended)
Services like **Codemagic** (codemagic.io) or **Expo's EAS Build** let you build and sign iOS apps entirely from the cloud — no Mac required. Codemagic has a free tier that's often enough for a small app like this.

General flow:
1. Push this `curbside-mobile` folder to a GitHub repo (similar to how you did the main app)
2. Sign up at Codemagic, connect that repo
3. Follow their iOS build setup wizard — it'll ask for your Apple Developer credentials/certificates
4. It builds the `.ipa` file and can even submit it to App Store Connect for you

### Option B: Rent a cloud Mac temporarily
Services like **MacinCloud** or **MacStadium** rent you a real macOS desktop by the hour/month — you remote into it, install Xcode, and build manually. More hands-on, but gives you full control.

### Apple Developer account (needed either way)
1. Go to **https://developer.apple.com/programs**
2. Enroll — $99/year, requires a real name or legal entity and a few days of verification sometimes
3. Once approved, you'll create an "App ID" and certificates — the cloud build service you choose will walk you through exactly what it needs

### Once you have iOS building
```bash
npx cap add ios
npx cap sync ios
```
Then follow your chosen cloud build service's instructions to build and submit from this project.

---

## Notes

- **Any time you update your live Vercel app**, you do NOT need to rebuild/resubmit the mobile app — it just loads the live site fresh each time, same as a browser. You'd only need to resubmit if you change `capacitor.config.ts` itself (e.g. app name, icon) or add native features.
- **App icon & splash screen**: Capacitor has an `@capacitor/assets` tool to generate all required icon sizes from one source image — ask if you'd like help setting that up once you're ready to polish the listing.
- **Push notifications**: not set up yet. If you want staff to get a phone notification (not just an in-app sound) when a new request comes in even with the app in the background, that requires a separate setup (`@capacitor/push-notifications` + a backend trigger) — let me know if you want this next.
