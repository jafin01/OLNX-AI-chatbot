import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Tracker from "@openreplay/tracker/cjs";
import { useEffect } from "react";

const tracker = new Tracker({
  projectKey: "OOfFclJkE8QmRYP6LCY7",
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    tracker.start();
  }, []);
  return (
    <>
      <Component {...pageProps} />
      <Toaster position={"bottom-right"} />
    </>
  );
}
