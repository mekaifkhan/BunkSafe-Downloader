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
  version: "2.4.0",
  releaseDate: "July 14, 2026",
  fileSize: "12.5 MB",
  minAndroidVersion: "Android 8.0 (Oreo) and above",
  // We can point to a local file path that is easy to replace, or a GitHub release URL
  downloadUrl: "/BunkSafe By Kaif Khan.apk",
  changelog: [
    "Stable Release v2.4.0 is Officially Live! Experience the fully revamped, lightning-fast BunkSafe attendance engine.",
    "Smart Attendance Calculator: Simulate different bunking scenarios and instantly see potential attendance percentages.",
    "Quick Attendance Tiles: Toggle presence or absence directly from the home screen.",
    "Performance Optimization: Faster startup time and reduced memory usage.",
    "Privacy Guard: Your data is saved directly on your phone so privacy is fully maintained. We don't keep your data on our servers."
  ]
};
