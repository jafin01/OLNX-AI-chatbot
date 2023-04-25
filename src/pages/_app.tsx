import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Tracker from "@openreplay/tracker";
// import trackerAssist from "@openreplay/tracker-assist";
import { useEffect } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/Admin/Layout";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const tracker = new Tracker({
  projectKey: "OOfFclJkE8QmRYP6LCY7",
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // tracker.use(trackerAssist({}));
    tracker.start();
  }, []);

  const router = useRouter();

  // console.log(router.pathname.includes("admin"));
  return (
    <QueryClientProvider client={queryClient}>
      {router.pathname.includes("admin") && (    
        <AdminLayout route={router.pathname} />
      )}
      <Component {...pageProps} />
      {/* <Toaster position={"bottom-right"} /> */}
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}
