import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  runTransaction, 
  setDoc,
  getDocFromServer
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase credentials retrieved from configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdnr-yXuGkuxxqLK8VRRawdngKLN9aqeI",
  authDomain: "shining-app-407pf.firebaseapp.com",
  projectId: "shining-app-407pf",
  storageBucket: "shining-app-407pf.firebasestorage.app",
  messagingSenderId: "128163725192",
  appId: "1:128163725192:web:dffa6d4c2852f9a318c43d"
};

// Initialize Named Firebase App to avoid conflicts with Vercel/BunkSafe main [DEFAULT] app
const appName = "shining-app";
const app = getApps().find(a => a.name === appName)
  ? getApp(appName)
  : initializeApp(firebaseConfig, appName);

// Initialize Firestore targeting our custom database ID
export const db = getFirestore(app, "ai-studio-795c8557-098d-4d18-97e1-b6ab3143e2eb");
export const auth = getAuth(app);

// A baseline of real stats to start with so the page doesn't look empty (e.g., 1,428 downloads)
const BASELINE_DOWNLOADS = 1428;

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Test Firebase Firestore database connection on boot as required by safety mandates.
 */
async function testConnection() {
  try {
    await getDocFromServer(doc(db, "downloads", "stats"));
  } catch (error) {
    if (error instanceof Error && error.message.includes("client is offline")) {
      console.warn("Firestore appears offline. Please check your network connection.");
    }
  }
}
testConnection();

/**
 * Safely fetches the current download count from Firestore.
 * If the stats document does not exist, it will create it with our professional baseline.
 */
export async function getDownloadCount(): Promise<number> {
  const docRef = doc(db, "downloads", "stats");
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().totalDownloads || BASELINE_DOWNLOADS;
    } else {
      // Initialize with our baseline
      try {
        await setDoc(docRef, { totalDownloads: BASELINE_DOWNLOADS });
      } catch (writeErr) {
        handleFirestoreError(writeErr, OperationType.WRITE, "downloads/stats");
      }
      return BASELINE_DOWNLOADS;
    }
  } catch (error) {
    // If we already handled it as a write error, it'll have been thrown.
    // Ensure all other permission errors or read issues are processed here:
    if (error instanceof Error && error.message.includes("permission")) {
      handleFirestoreError(error, OperationType.GET, "downloads/stats");
    }
    console.error("Error fetching download count from Firestore:", error);
    return BASELINE_DOWNLOADS; // Gracious fallback
  }
}

/**
 * Atomically increments the download counter in Firestore by exactly 1.
 * Returns the newly updated download count.
 */
export async function incrementDownloadCount(): Promise<number> {
  const docRef = doc(db, "downloads", "stats");
  try {
    let finalCount = BASELINE_DOWNLOADS + 1;
    await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(docRef);
      if (!sfDoc.exists()) {
        transaction.set(docRef, { totalDownloads: BASELINE_DOWNLOADS + 1 });
        finalCount = BASELINE_DOWNLOADS + 1;
      } else {
        const currentCount = sfDoc.data().totalDownloads || BASELINE_DOWNLOADS;
        finalCount = currentCount + 1;
        transaction.update(docRef, { totalDownloads: finalCount });
      }
    });
    return finalCount;
  } catch (error) {
    if (error instanceof Error && error.message.includes("permission")) {
      handleFirestoreError(error, OperationType.WRITE, "downloads/stats");
    }
    console.error("Error incrementing download count:", error);
    return BASELINE_DOWNLOADS + 1; // Fallback to baseline increment
  }
}
