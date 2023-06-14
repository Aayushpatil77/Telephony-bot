import Head from "next/head";
import { Rubik } from "next/font/google";
import FileUpload from "@components/FileUpload";

const rubik = Rubik({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Telephony Bot</title>
        <meta name="description" content="Send Calls immedtialy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <div
          className={`${rubik.className} container bg-zinc-900 text-white mx-auto flex justify-center items-center h-screen`}
        >
          <FileUpload />
        </div>
      </>
    </>
  );
}
