/**
 * BunkSafe APK Configuration File
 * 
 * Update this file whenever you release a new version of the BunkSafe app.
 * The entire landing page will automatically update with the new details.
 */

export interface ApkMetadata {
  version: string;         // e.g., "v1.2.4"
  releaseDate: string;     // e.g., "July 08, 2026"
  fileSize: string;        // e.g., "5.8 MB"
  minAndroidVersion: string; // e.g., "Android 8.0+ (API 26)"
  downloadUrl: string;     // Path to the APK file (can be a local path like "/apk/BunkSafe-v1.2.4.apk" or external URL)
  changelog: string[];     // Array of new features/fixes
}

export const apkConfig: ApkMetadata = {
  version: "v1.2.4",
  releaseDate: "July 08, 2026",
  fileSize: "12.8 MB",
  minAndroidVersion: "Android 8.0 (Oreo) and above",
  // We can point to a local file path that is easy to replace, or a GitHub release URL
  downloadUrl: "/apk/BunkSafe.apk",
  changelog: [
    "Smart Attendance Calculator: Simulate different bunking scenarios and instantly see potential attendance percentages.",
    "Quick Attendance Tiles: Toggle presence or absence directly from the home screen.",
    "Notification Reminders: Never forget to mark attendance after a class finishes.",
    "Performance Optimization: 40% faster startup time and reduced memory usage.",
    "Privacy Guard: Your data is saved directly on your phone so privacy is fully maintained. We don't keep your data on our servers."
  ]
};
