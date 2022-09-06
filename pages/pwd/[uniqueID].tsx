import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button } from "@components/atom/Button/Button";
import Navbar from "@components/Navbar";
import PasswordForm from "@components/PasswordForm";
import Loading from "@components/Loading";
import { useRouter } from "next/router";
import { database } from "@lib/firebaseConfig";
import { collection, getDoc, doc } from "firebase/firestore";
import { decryptPass } from "@lib/crypto";

const PasswordPage: NextPage = ({ decryptedPass, uniqueID }) => {
	// Delete password from database
	fetch("/api/deletePassword", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			uniqueID,
		}),
	});

	// This fixes an issue with NextJS images using inline-block
	const imgRef = useRef(null);
	useEffect(() => {
		imgRef.current.firstChild.style.display = "block";
	}, []);

	// If the password is not found, show loading
	if (!decryptedPass) {
		return <Loading />;
	}

	const copyToClipboard = (e) => {
		// Write to clipboard and show notification
		navigator.clipboard.writeText(decryptedPass);
		e.target.innerHTML = "Copied to clipboard!";
		e.target.classList.add("btn-success");

		// After 2 seconds, change the text back
		setTimeout(() => {
			e.target.classList.remove("btn-success");
			e.target.innerHTML = decryptedPass;
		}, 2000);
	};

	return (
		<>
			<Head>
				<title>Test</title>
				<meta
					name="description"
					content="Pasword allows users from all over the world to share passwords in a secure way. Using our one-time-only link feature no-one gets access to your password except the people you choose."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="hero min-h-screen bg-base-200">
				<div className="hero-content flex-col">
					<div className="card lg:card-side bg-base-100 shadow-xl">
						<div className="card-body max-w-md">
							<h2 className="card-title">You made it!</h2>
							<p>
								Someone needed you to have this password, so here you go. Make
								sure to keep it safe!
								<br />
								<br />
								To copy the password, simply click the password in the button
								below.
								<br />
								<br />
								<button
									onClick={(e) => copyToClipboard(e)}
									className="btn w-full break-all"
								>
									{decryptedPass}
								</button>
							</p>
							<div className="card-actions">
								Would you like to send a password?
								<Link href="/">
									<div className="btn btn-primary btn-xs">Click here</div>
								</Link>
							</div>
						</div>
						<figure ref={imgRef} className="hidden lg:block">
							<Image
								src="https://picsum.photos/400/550"
								width={400}
								height={500}
								alt="Random image from picsum photos"
							/>
						</figure>
					</div>
				</div>
			</div>
		</>
	);
};

export const getServerSideProps = async (ctx) => {
	const uniqueID = ctx.query.uniqueID;
	const docRef = doc(database, "passwords", uniqueID);
	const docSnap = await getDoc(docRef);
	const data = docSnap.data();

	if (!data) return { notFound: true };
	const decryptedPass = decryptPass(data.encryptedPass);

	return { props: { decryptedPass, uniqueID } };
};

export default PasswordPage;
