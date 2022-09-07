import { database } from "@lib/firebaseConfig";
import { collection, deleteDoc, doc } from "firebase/firestore";

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
