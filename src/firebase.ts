import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  increment, 
  serverTimestamp, 
  collection, 
  onSnapshot, 
  query, 
  where 
} from "firebase/firestore";

// Specific Firebase config provided exactly by the user
const firebaseConfig = {
  apiKey: "AIzaSyB12rTjDy70Uqy_i0iELtS6VC3MvXGlXWo",
  authDomain: "downloader-5bf47.firebaseapp.com",
  projectId: "downloader-5bf47",
  storageBucket: "downloader-5bf47.firebasestorage.app",
  messagingSenderId: "518176417528",
  appId: "1:518176417528:web:9d6a68ede46dabd6a8bd0d",
  measurementId: "G-YJ48GR8HH7"
};

// Initialize Firebase App gracefully
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Analytics (safely guarded for Server-Side Rendering if applicable)
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

// Initialize Firestore
export const firestore = getFirestore(app);

// Keep presence session ID in localStorage/memory to avoid recreating doc on every tab refresh
let presenceSessionId = "";
if (typeof window !== "undefined") {
  presenceSessionId = localStorage.getItem("bunksafe_presence_session_id") || "";
  if (!presenceSessionId) {
    presenceSessionId = "visitor_" + Math.random().toString(36).substring(2, 15);
    localStorage.setItem("bunksafe_presence_session_id", presenceSessionId);
  }
}

/**
 * Log a custom Google Analytics Event safely
 */
export function logAnalyticsEvent(eventName: string, params?: Record<string, any>) {
  try {
    if (analytics) {
      logEvent(analytics, eventName, params);
    }
  } catch (error) {
    console.error(`[Firebase Analytics Error] ${eventName}:`, error);
  }
}

/**
 * STEP 4 & 8 — Firestore Helper Functions
 */

// Whenever the website opens, increase totalVisits, update lastVisit, and log analytics event
export async function incrementVisit() {
  try {
    const docRef = doc(firestore, "stats", "website");
    await setDoc(docRef, {
      totalVisits: increment(1),
      lastVisit: serverTimestamp()
    }, { merge: true });
    
    logAnalyticsEvent("website_opened");
    logAnalyticsEvent("download_page_loaded"); // built-in context
  } catch (error) {
    console.error("[Firebase Error] incrementVisit failed:", error);
  }
}

// When APK Download button is clicked, increase apkDownloads and log event
export async function incrementAPKDownload() {
  try {
    const docRef = doc(firestore, "stats", "website");
    await setDoc(docRef, {
      apkDownloads: increment(1)
    }, { merge: true });
    
    logAnalyticsEvent("apk_download_clicked");
  } catch (error) {
    console.error("[Firebase Error] incrementAPKDownload failed:", error);
  }
}

// When Web App button is clicked, increase webAppClicks and log event
export async function incrementWebAppClick() {
  try {
    const docRef = doc(firestore, "stats", "website");
    await setDoc(docRef, {
      webAppClicks: increment(1)
    }, { merge: true });
    
    logAnalyticsEvent("web_app_clicked");
  } catch (error) {
    console.error("[Firebase Error] incrementWebAppClick failed:", error);
  }
}

// When Instagram clicked, increase instagramClicks and log event
export async function incrementInstagram() {
  try {
    const docRef = doc(firestore, "stats", "website");
    await setDoc(docRef, {
      instagramClicks: increment(1)
    }, { merge: true });
    
    logAnalyticsEvent("instagram_clicked");
  } catch (error) {
    console.error("[Firebase Error] incrementInstagram failed:", error);
  }
}

// When Telegram clicked, increase telegramClicks and log event
export async function incrementTelegram() {
  try {
    const docRef = doc(firestore, "stats", "website");
    await setDoc(docRef, {
      telegramClicks: increment(1)
    }, { merge: true });
    
    logAnalyticsEvent("telegram_clicked");
  } catch (error) {
    console.error("[Firebase Error] incrementTelegram failed:", error);
  }
}

// When Copy Link clicked, increase copyLinkClicks and log event
export async function incrementCopyLink() {
  try {
    const docRef = doc(firestore, "stats", "website");
    await setDoc(docRef, {
      copyLinkClicks: increment(1)
    }, { merge: true });
    
    logAnalyticsEvent("copy_link_clicked");
  } catch (error) {
    console.error("[Firebase Error] incrementCopyLink failed:", error);
  }
}

// STEP 5 — Unique Visitors
export async function trackUniqueVisitor() {
  try {
    if (typeof window === "undefined") return;
    const key = "bunksafe_first_visit";
    if (!localStorage.getItem(key)) {
      const docRef = doc(firestore, "stats", "website");
      await setDoc(docRef, {
        uniqueVisitors: increment(1)
      }, { merge: true });
      
      localStorage.setItem(key, "true");
      logAnalyticsEvent("first_visit");
    }
  } catch (error) {
    console.error("[Firebase Error] trackUniqueVisitor failed:", error);
  }
}

// STEP 6 — Live Users
export async function updatePresence() {
  if (!presenceSessionId) return;
  try {
    const docRef = doc(firestore, "presence", presenceSessionId);
    await setDoc(docRef, {
      online: true,
      lastSeen: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error("[Firebase Error] updatePresence failed:", error);
  }
}

/**
 * Realtime listener for stats document
 */
export function listenToStats(callback: (data: any) => void) {
  const docRef = doc(firestore, "stats", "website");
  return onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data());
    } else {
      callback({
        totalVisits: 0,
        uniqueVisitors: 0,
        apkDownloads: 0,
        webAppClicks: 0,
        instagramClicks: 0,
        telegramClicks: 0,
        copyLinkClicks: 0,
        lastVisit: null
      });
    }
  }, (error) => {
    console.error("[Firebase Error] listenToStats failed:", error);
  });
}

/**
 * Realtime listener for online presence documents
 * Considers users online if updated in the last 60 seconds
 */
export function listenToLiveUsers(callback: (count: number) => void) {
  const q = query(
    collection(firestore, "presence"),
    where("online", "==", true)
  );

  return onSnapshot(q, (snapshot) => {
    try {
      const sixtySecondsAgo = Date.now() - 60000;
      let count = 0;
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.lastSeen) {
          const lastSeenTime = data.lastSeen.toDate ? data.lastSeen.toDate().getTime() : new Date(data.lastSeen).getTime();
          if (lastSeenTime >= sixtySecondsAgo) {
            count++;
          }
        }
      });
      // Return at least 1 (the current user)
      callback(Math.max(1, count));
    } catch (e) {
      console.error("[Firebase Error] parse live users count failed:", e);
      callback(1);
    }
  }, (error) => {
    console.error("[Firebase Error] listenToLiveUsers failed:", error);
    callback(1);
  });
}
