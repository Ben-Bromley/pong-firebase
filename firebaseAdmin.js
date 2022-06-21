import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

var serviceAccount = require("./secrets.json");

if (getApps().length === 0) {
	initializeApp(
		{
			credential: cert(serviceAccount),
		},
		"firebaseAdmin"
	);
}

export const db = getFirestore();
