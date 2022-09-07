import { encryptPass } from "@lib/crypto";
import { database } from "@lib/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

import type { NextApiRequest, NextApiResponse } from "next";
const dbInstance = collection(database, "passwords");

type Data = {
	uniqueID?: string;
	error?: string;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const validInSec = req.body.validInSec || 0;

	// Encrypt password
	const encryptedPass = encryptPass(req.body.password);
	// Save encrypted password to database
	addDoc(dbInstance, {
		encryptedPass,
		validInSec,
	})
		.then((docRef) => {
			// Get the unique ID from the document reference
			const uniqueID = docRef.id;
			// Send uniqueID to client
			res.status(200).json({ uniqueID });
		})
		.catch((error) => {
			// Send error to client
			res.status(500).json({ error });
		});
}
