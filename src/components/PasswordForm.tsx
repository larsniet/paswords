import React, { useContext, useState, useEffect } from "react";

const validTimeMapping = {
	0: 600,
	25: 3600,
	50: 28800,
	75: 86400,
	100: 259200,
};

const PasswordForm = ({ setUniqueID, setValidInSec }) => {
	const [error, setError] = useState("");
	const [charCount, setCharCount] = useState(0);
	const [password, setPassword] = useState("");
	const [validTime, setValidTime] = useState(25);

	const handleInputChange = (e) => {
		setPassword(e.target.value.replace(/\s/g, ""));
		setCharCount(e.target.value.length);
		setError("");
	};

	const generate = async () => {
		if (password === "") {
			return setError("Password cannot be empty");
		}

		const validInSec = validTimeMapping[validTime];

		// Hash password
		const res = await fetch("/api/encryption", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				password,
				validInSec,
			}),
		});
		const data = await res.json();
		const uniqueID = data.uniqueID;

		setUniqueID(uniqueID);
		setValidInSec(validInSec);
	};

	return (
		<div className="w-full">
			<div className="card bg-base-100 shadow-xl">
				<div className="card-body">
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text">Fill in your password</span>
						</label>
						<input
							type="text"
							maxLength={100}
							value={password}
							onChange={(e) => handleInputChange(e)}
							placeholder="This is my super secret password"
							className={`input input-bordered w-full ${
								error ? "input-error" : ""
							}`}
						/>
						<label className="label">
							<span className="label-text-alt text-error">{error}</span>
							<span className="label-text-alt">{charCount}/100</span>
						</label>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">
								How long should the link be valid?
							</span>
						</label>
						<input
							type="range"
							min="0"
							max="100"
							className="range"
							step="25"
							onChange={(e) => setValidTime(e.target.value)}
							value={validTime}
						/>
						<div className="w-full flex justify-between text-xs px-2">
							<span className="-ml-6 mt-2">10 minutes</span>
							<span className="-ml-5 mt-2">1 hour</span>
							<span className="-ml-2 mt-2">8 hours</span>
							<span className="mt-2">1 day</span>
							<span className="-mr-3 mt-2">3 days</span>
						</div>
					</div>
					<div className="form-control w-full mt-8">
						<button onClick={() => generate()} className="btn btn-primary">
							Generate link
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PasswordForm;
