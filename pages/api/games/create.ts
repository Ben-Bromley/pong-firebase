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

        // get p1 UID from emails for db
        let p1Data = await db.collection("users").where("email", "==", req.body.p1Email).get()
        let p1UID = p1Data.docs[0].data().uid;
        // get p2 UID from emails for db
        let p2Data = await db.collection("users").where("email", "==", req.body.p2Email).get()
        let p2UID = p2Data.docs[0].data().uid;

        // add game to firestore
        const newGameDoc = await db.collection('games').doc().set({
            player_one_uid: p1UID,
            player_two_uid: p2UID,
            player_one_score: req.body.p1Score,
            player_two_score: req.body.p2Score,
            team: req.body.team
        }).catch((error) => {
            // return error if occurs
            return res.status(500).json({status: 500, message: error.message});
        });
    
        return res.status(200).json({status: 200, message: "success"});
    }
}
