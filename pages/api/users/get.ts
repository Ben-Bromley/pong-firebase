import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "../../../firebaseAdmin"; 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const email = req.query.email as string;

    if (!email) {
        res.status(400).json({status: 400, message: "Missing email"});
    }

    // get user by email
    const response = await db.collection('users').where('email', '==', email).get();

    if (response.empty) {
        res.status(404).json({status: 404, message: "User not found"});
    }

    res.status(200).json({status: 200, message: "success", data: response});
}
