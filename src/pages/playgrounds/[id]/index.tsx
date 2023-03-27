import Navbar from "@/components/Navbar";
import PlaygroundContent, { Message } from "@/components/Playground/Content";
import PlaygroundNavbar from "@/components/Playground/Navbar";
import { useConversationStore } from "@/stores/conversation";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Playground() {
  const [loading, setLoading] = useState<boolean>(true);
  const [intValues, setIntValues] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [nme, setNme] = useState<string>("");

  const { push, query } = useRouter();

  const [isBusy, setIsBusy] = useState(false);

  const { name } = useConversationStore((state: any) => state);

  useEffect(() => {
    if (!window.localStorage.getItem("accessToken")) {
      push("/login");
    }
    async function loadConversation() {
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
              config1: {
                system: res.data.conversation.system_1,
                model: res.data.config.model_1,
                temperature: res.data.config.temperature_1,
                maxLength: res.data.config.max_length_1,
                top_p: res.data.config.top_p_1,
                frequency_penalty: res.data.config.frequency_penalty_1,
                presence_penalty: res.data.config.presence_penalty_1,
              },
              config2: {
                system: res.data.conversation.system_2,
                model: res.data.config.model_2,
                temperature: res.data.config.temperature_2,
                maxLength: res.data.config.max_length_2,
                top_p: res.data.config.top_p_2,
                frequency_penalty: res.data.config.frequency_penalty_2,
                presence_penalty: res.data.config.presence_penalty_2,
              },
            };
            const msgs = res.data.messages.map((message: any) => {
              return {
                role: message.sender,
                message: message.message,
              };
            });
            setMessages(msgs);
            setIntValues(initialValues);
            setNme(res.data.conversation.name);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
      <PlaygroundNavbar isBusy={isBusy} setIsBusy={setIsBusy} nme={nme} />
      <PlaygroundContent
        msgs={messages}
        setIsBusy={setIsBusy}
        isBusy={isBusy}
        name={name}
        initialValues={intValues}
      />
    </>
  );
}
