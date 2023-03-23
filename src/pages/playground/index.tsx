import Navbar from "@/components/Navbar";
import PlaygroundContent from "@/components/Playground/Content";
import PlaygroundNavbar from "@/components/Playground/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Playground() {
  //   const [accessToken, setAccessToken] = useState<string | null>(null);
  const { push } = useRouter();

  useEffect(() => {
    if (!window.localStorage.getItem("accessToken")) {
      push("/login");
    }
  }, []);
  return (
    <>
      <Navbar />
      <PlaygroundNavbar />
      <PlaygroundContent />
    </>
  );
}
