const functions = require("firebase-functions");

exports.createPassword = functions.firestore
    .document("passwords/{passwordId}")
    .onCreate(async (snapshot, context) => {
        const obj = snapshot.data();
        const validInSec = obj.validInSec;

        return deletePassword(snapshot.ref, validInSec);
    });

const deletePassword = (ref, validInSec) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            ref.delete().then(resolve, reject);
        }, validInSec * 1000);
    });
};
