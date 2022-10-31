import { Loading } from "@components";
import { CipherType, decryptPass } from "@lib/crypto";
import { database } from "@lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, MouseEvent } from "react";

import type { NextPage } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

type PasswordPageProps = {
    decryptedPass: string;
    uniqueID: string;
};

const PasswordPage: NextPage<PasswordPageProps> = ({
    decryptedPass,
    uniqueID,
}) => {
    const [pass, setPass] = useState<string>("Click to reveal and copy");
    const [hasPressed, setHasPressed] = useState<boolean>(false);

    // This fixes an issue with NextJS images using inline-block
    const imgRef = useRef(null);
    useEffect(() => {
        imgRef.current.firstChild.style.display = "block";
    }, []);

    // If the password is not found, show loading
    if (!decryptedPass) {
        return <Loading />;
    }

    /* 
        Delete password from database
        This is done to prevent the password from being accessed again
    */
    const deletePassword = async () => {
        await fetch(baseUrl + "/api/deletePassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uniqueID,
            }),
        }).then((res) => {
            if (res.status !== 200) {
                // If the password is not deleted, return notFound to prevent access
                return {
                    notFound: true,
                };
            }
        });
    };

    const copyToClipboard = (e: any) => {
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

    const onButtonClick = async (e: any) => {
        e.preventDefault();

        // Set the password to the decrypted password
        setPass(decryptedPass);

        // Automatically copy to clipboard
        copyToClipboard(e);

        // If the button has not been pressed, show the password
        if (!hasPressed) {
            setHasPressed(true);
            return await deletePassword();
        }
    };

    return (
        <>
            <Head>
                <title>You made it! Here is your password</title>
            </Head>
            <div className="hero bg-base-200 items-start sm:items-center">
                <div className="hero-content flex-col">
                    <div className="card lg:card-side bg-base-100 shadow-xl">
                        <div className="card-body max-w-md">
                            <h2 className="card-title">You made it!</h2>
                            <p>
                                Someone needed you to have this password, so
                                here you go. Make sure to keep it safe!
                                <br />
                                <br />
                                To reveal the password, simply click the
                                password in the button below. It will be shown
                                and automatically copied to your clipboard.
                                <br />
                                <br />
                                <button
                                    onClick={(e) => onButtonClick(e)}
                                    className="btn w-full break-all normal-case"
                                >
                                    {pass}
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

export const getServerSideProps = async (ctx: { query: { uniqueID: any } }) => {
    const uniqueID = ctx.query.uniqueID;
    const docRef = doc(database, "passwords", uniqueID);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    // If the password is not found, return notFound
    if (!data) return { notFound: true };

    // Decrypt the password
    const cipher = data.encryptedPass as CipherType;
    const decryptedPass = decryptPass(cipher);

    return { props: { decryptedPass, uniqueID } };
};

export default PasswordPage;
