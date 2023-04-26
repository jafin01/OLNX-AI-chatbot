import { savePlayground } from "@/services/admin/admin.services";
import { useConversationStore } from "@/stores/conversation";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { rejects } from "assert";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
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
  id,
  isTempl = false,
}: {
  isBusy: boolean;
  setIsBusy: (b: boolean) => void;
  nme?: string;
  id?: string;
  isTempl?: boolean;
}) {
  const messages = useConversationStore((state: any) => state.messages);
  const configs = useConversationStore((state: any) => state.configs);

  const [name, setName] = useState(nme ? nme : "");
  const [saving, setSaving] = useState(false);
  const [isTemplate, setIsTemplate] = useState(isTempl)

  const { isLoading, error, data } = useQuery({
    queryKey: ["saveConversation"],
    queryFn: () => savePlayground({ messages, configs, template: isTemplate, id }),
    enabled: saving,
    retry: false,
  })

  useEffect(() => {
    if (error) {
      toast.error('error saving conversation')
      console.log(error);
    } else if (data) {
      toast.success('conversation saved successfully');
      console.log(data);
    }
  }, [error, data, isLoading]);
  
  async function handleSave({ template }: { template: boolean }) {
    setSaving(true);
    setIsBusy(true);
    try {
      const res = await savePlayground({ messages, configs, template, id });
      return res;
    } catch (error) {
      // Promise.reject(error)
      return error;
    } finally {
      setSaving(false);
      setIsBusy(false);
    }
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
        {!isTempl ? (
          <button
            type="button"
            // onClick={() => saveConversation({ template: false })}
            onClick={() => handleSave({ template: false })}
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
        ) : (
          <></>
        )}
        {isTempl ? (
          <button
            type="button"
            // onClick={() => saveConversation({ template: true })}
            onClick={() => handleSave({ template: true })}
            disabled={isBusy}
            className="rounded px-4 py-2 bg-rose-700 text-white disabled:bg-gray-300 disabled:text-gray-500 flex items-center gap-2"
          >
            <FiBox />
            <span>Save Template</span>
          </button>
        ) : (
          <button
            type="button"
            // onClick={() => saveConversation({ template: true })}
            onClick={() => handleSave({ template: true })}
            disabled={isBusy}
            className="rounded px-4 py-2 bg-rose-700 text-white disabled:bg-gray-300 disabled:text-gray-500 flex items-center gap-2"
          >
            <FiBox />
            <span>Save as Template</span>
          </button>
         )}
        {/*{navigator.share && (
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


// async function saveConversation({ template }: { template?: boolean }) {
  //   setSaving(true);
  //   setIsBusy(true);
  //   await axios
  //     .post(
  //       `${process.env.NEXT_PUBLIC_API_URL}/api/conversation${
  //         id ? "/update" : ""
  //       }`,
  //       {
  //         messages,
  //         configs,
  //         // config1: config1,
  //         // config2: config2,
  //         template: template ? true : false,
  //         id: id ? id : null,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${window.localStorage.getItem(
  //             "accessToken"
  //           )}`,
  //           Accept: "application/json",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log("Saving: ", res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   setSaving(false);
  //   setIsBusy(false);
  // }