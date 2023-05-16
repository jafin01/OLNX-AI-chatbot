/* eslint-disable react-hooks/exhaustive-deps */
import { LoadingPage } from "@/components/Loading";
import Navbar from "@/components/Navbar";
import PlaygroundContent from "@/components/Playground/Content";
import PlaygroundNavbar from "@/components/Playground/Navbar";
import { getOnePlayground } from "@/services/playground/getOnePlayground";
import { useQuery } from "@tanstack/react-query";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Playground() {
  const [nme, setNme] = useState<string>("");
  const [contentLoading, setContentLoading] = useState<boolean>(true);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [isTemplate, setIsTemplate] = useState<boolean>(false);

  const { data: session } = useSession();

  const { id } = useRouter().query;

  const { isLoading, data } = useQuery({
    queryKey: ["get-conversation"],
    queryFn: async () => {
      return await getOnePlayground({
        token: session?.user?.token || "",
        id: id ? id : null,
      });
    },
    onSuccess: (data: any) => {
      console.log(data);
      setContentLoading(false);
      setNme(data.conversation.name);
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="p-6">Loading...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      {contentLoading ? (
        <LoadingPage />
      ) : (
        <>
          <PlaygroundNavbar
            isBusy={isBusy}
            setIsBusy={setIsBusy}
            nme={nme}
            id={id}
            isTempl={isTemplate}
          />
          <PlaygroundContent
            msgs={data.messages}
            setIsBusy={setIsBusy}
            isBusy={isBusy}
            name={data.conversation.name}
            initialValues={data.configs}
          />
        </>
      )}
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
