import "server-only";

import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

/**
 * Firebase Admin SDK — server only.
 *
 * Initialisation is lazy and optional: while the site runs on the mock data in
 * `src/lib/data/*`, no Firebase credentials exist and nothing here should throw
 * or break the build. Call `getDb()` and handle `null` when you start reading
 * from Firestore.
 */

const APP_NAME = "lotuswave-admin";

interface AdminCredentials {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

function readCredentials(): AdminCredentials | null {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) return null;

  return {
    projectId,
    clientEmail,
    // Dashboards and .env files store the key with literal "\n" sequences.
    privateKey: privateKey.replace(/\\n/g, "\n"),
  };
}

/** True when all Firebase Admin env vars are present. */
export function isFirebaseConfigured() {
  return readCredentials() !== null;
}

function getAdminApp() {
  const credentials = readCredentials();
  if (!credentials) return null;

  const existing = getApps().find((app) => app.name === APP_NAME);
  if (existing) return getApp(APP_NAME);

  return initializeApp(
    {
      credential: cert(credentials),
      projectId: credentials.projectId,
    },
    APP_NAME,
  );
}

/** Firestore handle, or `null` when Firebase is not configured. */
export function getDb(): Firestore | null {
  const app = getAdminApp();
  return app ? getFirestore(app) : null;
}

/** Same as `getDb()` but throws — use in code paths that require Firestore. */
export function requireDb(): Firestore {
  const db = getDb();
  if (!db) {
    throw new Error(
      "Firebase Admin is not configured. Set FIREBASE_PROJECT_ID, " +
        "FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY.",
    );
  }
  return db;
}
