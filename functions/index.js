const functions = require("firebase-functions");

exports.createPassword = functions.firestore
	.document("passwords/{passwordId}")
	.onCreate(async (snapshot, context) => {
		const obj = snapshot.data();
		const validInSec = obj.validInSec;

		setTimeout(() => {
			snapshot.ref.delete();
		}, validInSec * 1000);
	});
