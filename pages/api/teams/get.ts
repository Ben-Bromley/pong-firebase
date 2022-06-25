import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "../../../firebaseAdmin"; 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const teamID = req.query.team_id as string;

    if (!teamID) {
        res.status(400).json({status: 400, message: "Missing team_id"});
    }

    // get team by id
    const response = await db.collection('teams').doc(teamID).get();
    
    if (!response.exists) {
        res.status(404).json({status: 404, message: "Team not found"});
    }

    res.status(200).json({status: 200, message: "success", data: response});
}
