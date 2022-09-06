const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);
export const createUniqueID = () => {
	let result = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;
	for (var i = 0; i < 30; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

export const hashPass = (unHashedPass: String) => {
	return bcrypt
		.hash(unHashedPass, salt)
		.then((hashedPass) => {
			return hashedPass;
		})
		.catch((err) => {
			return err;
		});
};

export const isPassCorrect = (unHashedPass: String, hashedPass: String) => {
	return bcrypt
		.compare(unHashedPass, hashedPass)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return err;
		});
};
