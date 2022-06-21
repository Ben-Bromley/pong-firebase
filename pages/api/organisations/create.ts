import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "../../../firebaseAdmin"; 
// type Data = {
//   name: string
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // working test
  //   const response = await db.collection('organisations').add({
  //       name: 'test1',
  //       createdAt: new Date().toISOString()
  //   });

  // res.status(200).json({message: "Hello World", data: response});
}
