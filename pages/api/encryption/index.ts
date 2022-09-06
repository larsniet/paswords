import type { NextApiRequest, NextApiResponse } from "next";
import { createUniqueID, hashPass, isPassCorrect } from "@lib/hashing";
import { encryptPass } from "@lib/crypto";
import { app, database } from "@lib/firebaseConfig";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
const dbInstance = collection(database, "passwords");

type Data = {
	password: string;
	validInSec: number;
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
	}).then((docRef) => {
		// Get the unique ID from the document reference
		const uniqueID = docRef.id;
		// Send uniqueID to client
		res.status(200).json({ uniqueID });
	});
}
