import { database } from "@lib/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req;

    switch (method) {
        case "DELETE":
            // Delete a password
            // Get reference to document
            const uniqueID = req.body.uniqueID;
            const docRef = doc(database, "passwords", uniqueID);

            // Delete document
            res.status(200).json(await deleteDoc(docRef));
            break;
        default:
            res.setHeader("Allow", ["DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
