import Navbar from "@/components/Navbar";
import PlaygroundContent from "@/components/Playground/Content";
import PlaygroundNavbar from "@/components/Playground/Navbar";
import { useConversationStore } from "@/stores/conversation";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Playground() {
  const [isBusy, setIsBusy] = useState(false);
  
  const name = useConversationStore((state: any) => state.name);
  return (
    <>
      <Navbar />
      <PlaygroundNavbar isBusy={isBusy} setIsBusy={setIsBusy} />
      <PlaygroundContent setIsBusy={setIsBusy} isBusy={isBusy} name={name} />
    </>
  );
}

export async function getServerSideProps({ req }: { req: any }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
