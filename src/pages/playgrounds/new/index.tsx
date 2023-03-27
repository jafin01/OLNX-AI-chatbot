import Navbar from "@/components/Navbar";
import PlaygroundContent from "@/components/Playground/Content";
import PlaygroundNavbar from "@/components/Playground/Navbar";
import { useConversationStore } from "@/stores/conversation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Playground() {
  //   const [accessToken, setAccessToken] = useState<string | null>(null);
  const { push } = useRouter();

  const [isBusy, setIsBusy] = useState(false);

  const name = useConversationStore((state: any) => state.name);

  useEffect(() => {
    if (!window.localStorage.getItem("accessToken")) {
      push("/login");
    }
  }, []);
  return (
    <>
      <Navbar />
      <PlaygroundNavbar isBusy={isBusy} setIsBusy={setIsBusy} />
      <PlaygroundContent setIsBusy={setIsBusy} isBusy={isBusy} name={name} />
    </>
  );
}
