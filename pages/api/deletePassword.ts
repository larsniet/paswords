import type { NextApiRequest, NextApiResponse } from "next";
import { createUniqueID, hashPass, isPassCorrect } from "@lib/hashing";
import { encryptPass } from "@lib/crypto";
import { database } from "@lib/firebaseConfig";
import { collection, deleteDoc, doc } from "firebase/firestore";
const dbInstance = collection(database, "passwords");

type Data = {
	uniqueID: string;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	// Get reference to document
	const uniqueID = req.body.uniqueID;
	const docRef = doc(database, "passwords", uniqueID);

	// Delete document
	deleteDoc(docRef)
		.then(() => {
			res.status(200).json({ uniqueID });
		})
		.catch((error) => {
			res.status(500).json({ error });
		});
}
