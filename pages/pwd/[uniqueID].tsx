import Loading from "@components/Loading";
import { decryptPass, CipherType } from "@lib/crypto";
import { database } from "@lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import type { NextPage } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

type PasswordPageProps = {
    uniqueID: string;
    decryptedPass: string;
};

const PasswordPage: NextPage<PasswordPageProps> = ({
    uniqueID,
    decryptedPass,
}) => {
    // Delete password from database
    fetch(baseUrl + "/api/deletePassword", {
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
                                Someone needed you to have this password, so
                                here you go. Make sure to keep it safe!
                                <br />
                                <br />
                                To copy the password, simply click the password
                                in the button below.
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
                                    <div className="btn btn-primary btn-xs">
                                        Click here
                                    </div>
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
    const cipher = data.encryptedPass as CipherType;
    const decryptedPass = decryptPass(cipher);

    return { props: { decryptedPass, uniqueID } };
};

export default PasswordPage;
