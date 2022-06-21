import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "../../../firebaseAdmin";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "GET") {
        const email = req.query.email as string;
        const uid = req.query.uid as string;

        let response;

        if (email) {
            // get user by email. if empty, return 404, otherwise return user data
            response = await db.collection('users').where('email', '==', email).get();
            if (response.empty) {
                res.status(404).json({ status: 404, message: "User not found" });
            }
            response = response.docs[0].data();
        } else if (uid) {
            // get user by uid, if empty, return 404, if not empty, return user data
            response = await db.collection('users').doc(uid).get();
            if (!response.exists) {
                res.status(404).json({ status: 404, message: "User not found" });
            }
            response = response.data();
        } else {
            // return error if user identifier is not provided
            res.status(400).json({ status: 400, message: "Missing user identifier (uid or email)" });
        }

        res.status(200).json({ status: 200, message: "success", data: response });

    } else {
        res.status(405).json({ status: 405, message: "Method not allowed" });
    }
}
