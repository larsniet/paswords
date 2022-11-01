import { encryptPass } from "@lib/crypto";
import { database } from "@lib/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

import type { NextApiRequest, NextApiResponse } from "next";
const dbInstance = collection(database, "passwords");

type Data = {
    uniqueID?: string;
    iv?: string;
    error?: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const validInSec = req.body.validInSec || 0;

    /* 
    This encrypts the password and returns it in two parts like so:
        {
            iv: "some random string",
            content: "some encrypted string"
        } 
    Together they can decrypt the password 
    */
    const { content, iv } = encryptPass(req.body.password);

    return new Promise<void>((resolve, reject) => {
        // Save only the content of the encrypted password to the database,
        // this way we could never decrypt the password without the iv
        addDoc(dbInstance, {
            content,
            validInSec,
        })
            .then((docRef) => {
                // Get the unique ID from the document reference
                const uniqueID = docRef.id;
                // Send uniqueID and the iv to client for URL generation
                res.status(200).json({ uniqueID, iv });
                resolve();
            })
            .catch((error) => {
                // Send error to client
                res.status(500).json({ error });
                reject();
            });
    });
}
