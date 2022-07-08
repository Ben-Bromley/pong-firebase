import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "../../../firebaseAdmin"; 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    if (req.method !== "POST") {
        return res.status(405).json({status: 405, message: "Method not allowed"});
    }

    // check method is post
    if (req.method === 'POST') {
        // find organisation by provided identifier

        // add user to firestore
        const newUserDocument = await db.collection('users').doc(req.body.uid).set({
            uid: req.body.uid,
            email: req.body.email as string,
            name: req.body.name as string,
            createdAt: new Date().toISOString(),
            team: req.body.team as string,
        }).catch((error) => {
            return res.status(500).json({status: 500, message: error.message});
        });
    
    
        return res.status(200).json({status: 200, message: "success", data: newUserDocument});
    }
}
