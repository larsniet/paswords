import Modal from "@/components/Modal";
import PasswordForm from "@/components/PasswordForm";
import Head from "next/head";
import { useEffect, useState } from "react";

import type { NextPage } from "next";

const Home: NextPage = () => {
	const [uniqueID, setUniqueID] = useState<string>("");
	const [validInSec, setValidInSec] = useState<number>(0);

	return (
		<>
			<Head>
				<title>
					Pasword. The safest way to send passwords over the internet.
				</title>
				<meta
					name="description"
					content="Pasword allows users from all over the world to share passwords in a secure way. Using our one-time-only link feature no-one gets access to your password except the people you choose."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="hero min-h-screen">
				<div className="hero-content flex-col lg:flex-row">
					<div>
						<h1 className="text-5xl font-bold">One Time Link</h1>
						<p className="py-6">
							Fill in the password you want to share in the form. You can share
							a password generated by our service or you can paste in your own.
							Make sure your password is secure and not used for any other
							service!
						</p>
					</div>
					<PasswordForm
						setUniqueID={setUniqueID}
						setValidInSec={setValidInSec}
					/>
				</div>
			</div>
			<Modal uniqueID={uniqueID} validInSec={validInSec} />
		</>
	);
};

export default Home;
