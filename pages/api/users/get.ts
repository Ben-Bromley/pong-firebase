import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "../../../firebaseAdmin";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "GET") {
        const email = req.query.email as string;
        const uid = req.query.uid as string;
        const team = req.query.team as string;

        let response: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> | FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
        let returnData: FirebaseFirestore.DocumentData | undefined

        if (team) {
            response = await db.collection("users").where("team", "==", team).get();
            if (response.empty) {
                res.status(404).json({ status: 404, message: "No users found" })
            }
            returnData = response.docs[0].data()
        } else if (email) {
            // get user by email. if empty, return 404, otherwise return user data
            response = await db.collection('users').where('email', '==', email).get();
            if (response.empty) {
                return res.status(404).json({ status: 404, message: "User not found" });
            }
            returnData = response.docs[0].data();
        } else if (uid) {
            // get user by uid, if empty, return 404, if not empty, return user data
            response = await db.collection('users').doc(uid).get();
            if (!response.exists) {
                return res.status(404).json({ status: 404, message: "User not found" });
            }
            returnData = response.data();
        } else {
            // return error if user identifier is not provided
            return res.status(400).json({ status: 400, message: "Missing user identifier (uid or email)" });
        }

        return res.status(200).json({ status: 200, message: "success", data: returnData });

    } else {
        return res.status(405).json({ status: 405, message: "Method not allowed" });
    }
}
