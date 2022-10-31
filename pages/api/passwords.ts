import { database } from "@lib/firebaseConfig";
import { deleteDoc, doc, getDoc } from "firebase/firestore";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Create get, post, put, delete functions
    const { method } = req;

    switch (method) {
        case "GET":
            // Get the passwords count
            const passwordsCount = await getDoc(
                doc(database, "counters", "total-generated-passwords")
            );
            // Get passwords count data
            const passwordsCountData = passwordsCount.data();
            // Return the count
            res.status(200).json(passwordsCountData);
            break;
        case "DELETE":
            // Delete a password
            // Get reference to document
            const uniqueID = req.body.uniqueID;
            const docRef = doc(database, "passwords", uniqueID);

            // Delete document
            res.status(200).json(await deleteDoc(docRef));
            break;
        default:
            res.setHeader("Allow", ["GET", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
