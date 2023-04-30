import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Tracker from "@openreplay/tracker";
// import trackerAssist from "@openreplay/tracker-assist";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/Admin/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider, getSession } from "next-auth/react";

const tracker = new Tracker({
  projectKey: "OOfFclJkE8QmRYP6LCY7",
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<string | null | undefined>(null);
  const router = useRouter();

  useEffect(() => {
    // tracker.use(trackerAssist({}));
    tracker.start();
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        {router.pathname.includes("admin") && (
          <AdminLayout route={router.pathname} />
        )}
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </SessionProvider>
  );
}