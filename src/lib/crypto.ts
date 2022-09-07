const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const secretKey = process.env.SECRET_KEY;

export type CipherType = {
	iv: string;
	content: string;
};

export const encryptPass = (text: string) => {
	const iv = crypto.randomBytes(16);
	const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
	const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

	const data: CipherType = {
		iv: iv.toString("hex"),
		content: encrypted.toString("hex"),
	};

	return data;
};

export const decryptPass = (data: CipherType) => {
	const decipher = crypto.createDecipheriv(
		algorithm,
		secretKey,
		Buffer.from(data.iv, "hex")
	);

	const decrpyted = Buffer.concat([
		decipher.update(Buffer.from(data.content, "hex")),
		decipher.final(),
	]);

	return decrpyted.toString();
};
