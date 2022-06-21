import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

var serviceAccount = require("./secrets.json");

if (getApps().length === 0) {
	initializeApp({ credential: cert(serviceAccount) }, "firebaseAdmin");
}

// using getApp() to load the correct firebase instace
export const db = getFirestore(getApp("firebaseAdmin"));
