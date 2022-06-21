import type { NextApiRequest, NextApiResponse } from 'next'
import { getApps } from "firebase-admin/app"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {


    const apps = getApps();
    res.status(200).json({status: 200, message: "success", data: apps});

}
