import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "../../../firebaseAdmin"; 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const orgID = req.query.organisation_id as string;

    if (!orgID) {
        res.status(400).json({status: 400, message: "Missing organisation_id"});
    }

    // get organisation by id
    const response = await db.collection('organisations').doc(orgID).get();
    
    if (!response.exists) {
        res.status(404).json({status: 404, message: "Organisation not found"});
    }

    res.status(200).json({status: 200, message: "success", data: response});
}
