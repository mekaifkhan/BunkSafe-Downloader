# 📱 BunkSafe Website & APK Distribution

Welcome to the BunkSafe landing page and download hub! This project serves as the official presentation and delivery website for the **BunkSafe** Android application.

The website provides direct access for users to download the actual production **BunkSafe.apk** file, view interactive mockups, and learn about the application's privacy-first, internet-enabled features.

---

## 🚀 How to Update the Android APK File

The download button on the website is configured to always serve the file located at:
```bash
/public/apk/BunkSafe.apk
```

To update the distributed app to a newer version, follow these simple, beginner-friendly steps:

### Step 1: Prepare Your New APK
Build your updated Android application inside Android Studio (or your preferred tool) to generate the production release APK file (e.g., `app-release.apk`).

### Step 2: Rename Your File
Rename your newly built `.apk` file exactly to:
```text
BunkSafe.apk
```
*(Make sure the capitalization is exact: **B**unk**S**afe with `.apk` extension in lowercase)*

### Step 3: Replace the File in this Project
Upload and replace the existing file at this path in your project directory:
```bash
/public/apk/BunkSafe.apk
```
*Note: The platform's web server maps the contents of `/public` directly to the website's root URL. Thus, `/public/apk/BunkSafe.apk` is served seamlessly to clients requesting `/apk/BunkSafe.apk`.*

---

## ⚙️ How to Update Website APK Metadata (Optional)

If the new APK has a different version number, file size, or release date, you can update the website UI text easily:

1. Open `/src/config/apkConfig.ts`
2. Update the fields to match your new release:
   ```typescript
   export const apkConfig = {
     version: "1.4.3",              // Update version number
     releaseDate: "August 2026",     // Update release month/year
     fileSize: "6.8 MB",            // Update file size in MBs
     downloadUrl: "/apk/BunkSafe.apk", // Keep this unchanged
     // ...
   };
   ```
3. Save the file and the website will automatically refresh to show the new details.

---

## 🔒 Privacy & Connectivity Architecture

- **Works with Internet:** BunkSafe is an internet-enabled application that can sync public college timetables and class schedules automatically.
- **Data Privacy Guard:** We **never** store or upload any personal attendance logs, registers, or user schedule selections onto our servers. Everything is saved directly and securely inside your device's local database, ensuring your privacy remains fully maintained.
