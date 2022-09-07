import { database } from "@lib/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    uniqueID?: string;
    error?: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // Get reference to document
    const uniqueID = req.body.uniqueID;
    const docRef = doc(database, "passwords", uniqueID);

    // Delete document
    return new Promise<void>((resolve, reject) => {
        deleteDoc(docRef)
            .then(() => {
                res.status(200).json({ uniqueID });
                resolve();
            })
            .catch((error) => {
                res.status(500).json({ error });
                reject();
            });
    });
}
