import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Tracker from "@openreplay/tracker";
import trackerAssist from "@openreplay/tracker-assist";
import { useEffect } from "react";

const tracker = new Tracker({
  projectKey: "OOfFclJkE8QmRYP6LCY7",
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    tracker.use(trackerAssist({}));
    tracker.start();
  }, []);
  return (
    <>
      <Component {...pageProps} />
      <Toaster position={"bottom-right"} />
    </>
  );
}
