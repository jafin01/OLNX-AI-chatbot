import { useConversationStore } from "@/stores/conversation";
import axios from "axios";
import { useState } from "react";
import {
  FiLoader,
  FiSave,
  FiBox,
  FiMessageSquare,
  FiShare,
} from "react-icons/fi";

export default function PlaygroundNavbar({
  isBusy,
  setIsBusy,
  nme,
}: {
  isBusy: boolean;
  setIsBusy: (b: boolean) => void;
  nme?: string;
}) {
  const messages = useConversationStore((state: any) => state.messages);
  const config1 = useConversationStore((state: any) => state.config1);
  const config2 = useConversationStore((state: any) => state.config2);

  const [name, setName] = useState(nme ? nme : "");
  const [saving, setSaving] = useState(false);

  async function saveConversation({ template }: { template?: boolean }) {
    setSaving(true);
    setIsBusy(true);
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/conversation`,
        {
          messages: messages,
          config1: config1,
          config2: config2,
          name: name,
          template: template ? true : false,
        },
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
        console.log("Saving: ", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setSaving(false);
    setIsBusy(false);
  }

  return (
    <nav className="w-full border-b border-gray-300 h-16 p-6 flex justify-between items-center gap-4">
      <h2 className="font-semibold text-xl flex items-center gap-2">
        <FiMessageSquare />
        <span>Playground</span>
      </h2>
      <input
        type="text"
        className="flex-1 px-4 py-2 rounded outline-none font-gray-700"
        placeholder="Name: Auto Generated On Save (Click To Add Custom Name)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex items-center gap-2">
        <button
          onClick={() => saveConversation({ template: false })}
          disabled={isBusy ? true : saving}
          className="rounded px-4 py-2 bg-teal-700 text-white disabled:bg-gray-300 disabled:text-gray-500 flex items-center gap-2"
        >
          {saving ? (
            <>
              <FiLoader />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <FiSave />
              <span>Save</span>
            </>
          )}
        </button>
        <button
          onClick={() => saveConversation({ template: true })}
          disabled={isBusy}
          className="rounded px-4 py-2 bg-rose-700 text-white disabled:bg-gray-300 disabled:text-gray-500 flex items-center gap-2"
        >
          <FiBox />
          <span>Save as Template</span>
        </button>
        {/* {navigator.share && (
          <button
            onClick={() =>
              navigator.share({
                title: "OLNX Playground",
                url: window.location.href,
              })
            }
            disabled={isBusy}
            className="rounded px-4 py-2 bg-amber-700 text-white disabled:bg-gray-300 disabled:text-gray-500 flex items-center gap-2"
          >
            <FiShare />
            <span>Share</span>
          </button>
        )} */}
      </div>
    </nav>
  );
}
