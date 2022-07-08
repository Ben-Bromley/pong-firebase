import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "../../../firebaseAdmin";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // decodeURI for team names with spaces
    let teamID = req.query.team_id as string;
    let teamName = req.query.team as string;
    teamName = teamName ? decodeURI(teamName) : teamName;

    // let response: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData> | FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> | null = null;
    let teamData: FirebaseFirestore.DocumentData | null = null;
    let docExists: boolean = false;
    let docId: string | null = null;

    if (!teamID && !teamName) {
        return res.status(400).json({ status: 400, message: "Missing Team Identifier" });
    }

    if (teamID) {
        // get team by id
        let response = await db.collection('teams').doc(teamID).get();
        docExists = response.exists;
        teamData = docExists ? response.data() as FirebaseFirestore.DocumentData | null : null;
        docId = docExists ? response.id : null;
    }

    if (teamName) {
        // get team by name
        let response = await db.collection('teams').where('name', '==', teamName).limit(1).get();
        docExists = !response.empty;
        teamData = docExists ? response.docs[0].data() : null;
        docId = docExists ? response.docs[0].id : null;
    }

    if (!teamData || !docExists) {
        return res.status(404).json({ status: 404, message: "Team not found", data: { teamExists: docExists } });
    }

    const data = { teamId: docId, teamExists: docExists, ...teamData};

    return res.status(200).json({ status: 200, message: "success", data });
}
