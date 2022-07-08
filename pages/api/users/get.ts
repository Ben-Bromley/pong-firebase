import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "../../../firebaseAdmin";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method !== "GET") {
        return res.status(405).json({ status: 405, message: "Method not allowed" });
    }

    const email = req.query.email as string;
    const uid = req.query.uid as string;
    const team = req.query.team as string;

    let response: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> | FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData> | undefined;
    let returnData: FirebaseFirestore.DocumentData | null

    if (!team && !email && !uid) {
        return res.status(400).json({ status: 400, message: "Missing user identifier (uid, email, or team)" });
    }

    let userCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
    let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> | undefined;

    // set collection
    userCollection = db.collection("users")
    // add queries to collection based on params
    if (uid)   query = userCollection.where("uid", "==", uid);
    if (team)  query = userCollection.where("team", "==", team);
    if (email) query = userCollection.where('email', '==', email);
    response = await query?.get();

    // return 404 if user doc not found
    if (response?.empty) {
        return res.status(404).json({ status: 404, message: "User not found" });
    }

    returnData = response && response.docs[0].data() ? response.docs[0].data() : null;
    return res.status(200).json({ status: 200, message: "success", data: returnData });


}
