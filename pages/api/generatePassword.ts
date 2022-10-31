const generator = require("generate-password");

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Get the passwordLength and passwordType from the request body
    const { length, type } = req.body;

    // Generate a random password
    const password = generator.generate({
        length: length,
        numbers: type.includes("numbers") ? true : false,
        symbols: type.includes("symbols") ? true : false,
        strict: true,
    });

    // Send the password back to the client
    res.status(200).json(password);
}
