import Head from "next/head";
import Link from "next/link";

import type { NextPage } from "next";

const NotFound: NextPage = () => {
    return (
        <>
            <Head>
                <title>Woops that link is not valid</title>
            </Head>
            <div className="lg:px-24 md:px-44 px-4 flex flex-col-reverse lg:flex-row justify-center">
                <div className="w-full xl:w-1/2 relative pb-12 lg:pb-0 h-64">
                    <div className="absolute z-10">
                        <h1 className="my-2 font-bold text-2xl md:text-4xl">
                            Looks like you have found the doorway to the great
                            nothing
                        </h1>
                        <p className="my-2 md:text-xl">
                            Sorry about that! The link to your password is
                            either invalid or has expired.
                        </p>
                        <Link href={"/"}>
                            <div className="btn btn-primary">take me home!</div>
                        </Link>
                    </div>
                    <div
                        className="absolute font-bold z-0 text-slate-200 dark:text-primary"
                        style={{ fontSize: "150px" }}
                    >
                        404
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFound;
