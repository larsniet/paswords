import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import type { NextPage } from "next";

import Image404 from "@assets/404.png";

const NotFound: NextPage = () => {
    return (
        <>
            <Head>
                <title>Woops that link is not valid</title>
            </Head>
            <div className="lg:px-24 md:px-44 px-4 flex flex-col-reverse lg:flex-row justify-center">
                <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0 h-64">
                    <div className="absolute z-10">
                        <h1 className="my-2 font-bold text-2xl">
                            Looks like you've found the doorway to the great
                            nothing
                        </h1>
                        <p className="my-2">
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
                <div className="w-auto md:w-96">
                    <Image
                        src={Image404}
                        width={700}
                        height={500}
                        quality={100}
                    />
                </div>
            </div>
        </>
    );
};

export default NotFound;
