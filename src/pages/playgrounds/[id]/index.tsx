/* eslint-disable react-hooks/exhaustive-deps */
import { LoadingPage } from "@/components/Loading";
import Navbar from "@/components/Navbar";
import PlaygroundContent, { Message } from "@/components/Playground/Content";
import PlaygroundNavbar from "@/components/Playground/Navbar";
import { useConversationStore } from "@/stores/conversation";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const dummy_configs = {
  responses_to_generate: 5,
  config: {
    model: "gpt-4",
    system: "",
    temperature: "0.7",
    maxLength: "256",
    top_p: "1",
    frequency_penalty: "0",
    presence_penalty: "0",
  }
}

export default function Playground() {
  const [loading, setLoading] = useState<boolean>(true);
  const [intValues, setIntValues] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [nme, setNme] = useState<string>("");
  const [contentLoading, setContentLoading] = useState<boolean>(true);

  const { push, query } = useRouter();

  const [isBusy, setIsBusy] = useState(false);

  const { name } = useConversationStore((state: any) => state);

  const [isTemplate, setIsTemplate] = useState(false);

  useEffect(() => {
    // if (!window.localStorage.getItem("accessToken")) {
    //   push("/login");
    // }
    async function loadConversation() {
      setLoading(true);
      if (query.id) {
        await axios
          .get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/conversation/${query.id}`,
            {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem(
                  "accessToken"
                )}`,
                Accept: "application/json",
              },
            }
          )
          .then((res) => {
            const initialValues = {
              responses_to_generate: 5,
              configs: [],
            };
            const msgs = res.data.messages.map((message: any) => {
              return {
                role: message.sender,
                message: message.message,
              };
            });
            setMessages(msgs);
            setIntValues(initialValues);
            setIsTemplate(res.data.conversation.template);
            setNme(res.data.conversation.name);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      setContentLoading(false);
    }
    loadConversation();
  }, [query]);

  if (loading) {
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
            id={query.id as string}
            isTempl={isTemplate}
          />
          <PlaygroundContent
            msgs={messages}
            setIsBusy={setIsBusy}
            isBusy={isBusy}
            name={name}
            initialValues={intValues}
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
