import { Form, Formik } from "formik";
import PlaygroundChatBubble from "./ChatBubble";
import PlaygroundAddChatBubble from "./AddChatBubble";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useConversationStore } from "@/stores/conversation";
import { FiSend, FiLoader } from "react-icons/fi";

export type Message = {
  role: "Assistant #1" | "Assistant #2";
  message: string;
};

export default function PlaygroundContent({
  name,
  setIsBusy,
  isBusy,
  initialValues,
  msgs,
}: {
  name: string;
  setIsBusy: (b: boolean) => void;
  isBusy: boolean;
  initialValues?: any;
  msgs?: Message[];
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "Assistant #1",
      message: "Hello.",
    },
    {
      role: "Assistant #2",
      message: "Hello, I am an assistant.",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [itteration, setItteration] = useState(5);

  useEffect(() => {
    setIsBusy(loading);
    if (msgs) {
      setMessages(msgs);
    }
  }, []);

  const setConversation = useConversationStore(
    (state: any) => state.setConversation
  );

  const formikRef = useRef<any>();

  useEffect(() => {
    if (formikRef) {
      saveConversation();
    }
  }, [formikRef]);

  useEffect(() => {
    saveConversation();
    if (itteration < formikRef.current.values.responses_to_generate - 1) {
      setItteration((prev) => prev + 1);
    }
  }, [messages]);

  useEffect(() => {
    if (itteration < formikRef.current.values.responses_to_generate) {
      generateResponse(formikRef.current.values);
    }
  }, [itteration]);

  // a function to save the conversation
  async function saveConversation() {
    await setConversation({
      config1: formikRef.current.values.config1,
      config2: formikRef.current.values.config2,
      messages: messages,
      name: name,
    });
  }

  // a function that deletes a particular message from the messages array based on index
  function deleteMessage(index: number) {
    setMessages((prev) => prev.filter((_, i) => i !== index));
  }

  // a fucntion that adds a new message to the messages array
  function addMessage() {
    // check last messae role
    const lastMessage = messages[messages.length - 1];
    if (lastMessage) {
      setMessages((prev) => [
        ...prev,
        {
          role:
            lastMessage.role === "Assistant #1"
              ? "Assistant #2"
              : "Assistant #1",
          message: "",
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          role: "Assistant #1",
          message: "",
        },
      ]);
    }
  }

  // a functoion that updates the message in the messages array
  function updateMessage(index: number, msg: string) {
    setMessages((prev) =>
      prev.map((message, i) => {
        if (i === index) {
          return {
            ...message,
            message: msg,
          };
        }
        return message;
      })
    );
  }

  // a function that alternates the role of a message in the messages array
  function changeRole(index: number) {
    setMessages((prev) =>
      prev.map((message, i) => {
        if (i === index) {
          return {
            ...message,
            role:
              message.role === "Assistant #1" ? "Assistant #2" : "Assistant #1",
          };
        }
        return message;
      })
    );
  }

  // a function that calls an API over post
  async function generateResponses(values: any) {
    // setLoading(true);
    // // call generateResponse based on the number of responses to generate
    // for (let i = 0; i < values.responses_to_generate; i++) {
    //   await generateResponse(values);
    // }

    // setLoading(false);
    setItteration(0);
  }

  async function generateResponse(values: any) {
    setLoading(true);
    const lastMessage = messages[messages.length - 1];
    const generatedMessages = messages.map((message) => ({
      role: message.role === lastMessage.role ? "user" : "assistant",
      content: message.message,
    }));
    const systemMessage =
      lastMessage.role === "Assistant #1"
        ? values.config2.system
        : values.config1.system;
    const model =
      lastMessage.role === "Assistant #1"
        ? values.config2.model
        : values.config1.model;
    await axios
      .post("https://dribs.dev/ai/chat", {
        messages: [
          {
            role: "system",
            content: systemMessage
              ? systemMessage
              : "You are a helpful assistant.",
          },
          ...generatedMessages,
        ],
        model: model,
      })
      .then(async (res) => {
        // console.log("Updating Message", { res });
        const newMessage = res.data.choices[0].message.content;
        // console.log("Get New Message", newMessage);
        await setMessages((prevMessages) => [
          ...prevMessages,
          {
            role:
              lastMessage.role === "Assistant #1"
                ? "Assistant #2"
                : "Assistant #1",
            message: newMessage,
          },
        ]);
        console.log("Message Updated", messages);
      })
      .catch((err) => {
        console.log({ err });
      });
    setLoading(false);
  }

  let intValues: any;
  if (!initialValues) {
    intValues = {
      responses_to_generate: 5,
      config1: {
        system: "",
        model: "gpt-4",
        temperature: "0.7",
        maxLength: "256",
        top_p: "1",
        frequency_penalty: "0",
        presence_penalty: "0",
      },
      config2: {
        system: "",
        model: "gpt-4",
        temperature: "0.7",
        maxLength: "256",
        top_p: "1",
        frequency_penalty: "0",
        presence_penalty: "0",
      },
    };
  } else {
    intValues = initialValues;
  }

  // const validationSchema = {
  //   responses_to_generate: Yup.number().required("Required")
  // };
  return (
    <Formik
      initialValues={intValues}
      //   validationSchema={validationSchema}
      innerRef={formikRef}
      onSubmit={generateResponses}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form
          className="px-6 flex gap-6"
          style={{ height: "calc(100vh - 8rem)" }}
        >
          <aside className="w-96 h-full flex flex-col gap-4 py-6">
            <div className="p-4 h-full border border-gray-300 rounded-sm flex flex-col">
              <h4 className="font-semibold font-mono">System: Assistant #1</h4>
              <textarea
                onChange={(e) => {
                  handleChange(e);
                  saveConversation();
                }}
                disabled={isBusy}
                onBlur={handleBlur}
                name="config1.system"
                value={values.config1.system}
                className="h-full w-full resize-none outline-none"
                placeholder="You are a helpful assistant."
                //   bind:value={system1}
              />
            </div>
            <div className="p-4 h-full border border-gray-300 rounded-sm flex flex-col">
              <h4 className="font-semibold font-mono">System: Assistant #2</h4>
              <textarea
                onChange={(e) => {
                  handleChange(e);
                  saveConversation();
                }}
                disabled={isBusy}
                onBlur={handleBlur}
                name="config2.system"
                value={values.config2.system}
                className="h-full w-full resize-none outline-none"
                placeholder="You are a helpful assistant."
                //   bind:value={system2}
              />
            </div>
          </aside>
          <section className="w-full flex flex-col gap-2 py-6">
            <div className="w-full h-full flex-1 overflow-y-auto">
              {/* {#each messages as message} */}
              {messages.map((message, index) => {
                return (
                  <PlaygroundChatBubble
                    key={index}
                    onChange={(msg: string) => {
                      updateMessage(index, msg);
                    }}
                    name={message.role}
                    message={message.message}
                    onClickName={() => {
                      changeRole(index);
                    }}
                    // bind:name={message.role}
                    // bind:message={message.message}
                    removeMessage={() => deleteMessage(index)}
                  />
                );
              })}
              {/* {/each} */}
              <PlaygroundAddChatBubble onClick={addMessage} />
            </div>
            <footer className="w-full p-4 flex h-16 items-center">
              <span className="flex-1">&nbsp;</span>
              <div className="flex items-center gap-2">
                <p className="text-gray-500 font-mono">
                  Responses to generate:
                </p>
                <input
                  type="number"
                  name="responses_to_generate"
                  disabled={isBusy}
                  className={`
                    rounded-sm p-2 w-24 ${
                      errors.responses_to_generate &&
                      touched.responses_to_generate
                        ? "border-red-500 bg-red-200"
                        : "bg-white"
                    }`}
                  placeholder="1-100"
                  min="1"
                  max="100"
                  onChange={async (e) => {
                    await handleChange(e);
                    saveConversation();
                  }}
                  onBlur={handleBlur}
                  value={values.responses_to_generate}
                  // bind:value={responses_to_generate}
                />
                <button
                  type="submit"
                  disabled={isBusy ? true : loading}
                  className="disabled:bg-gray-300 disabled:text-gray-500 bg-teal-700 text-white rounded hover:bg-teal-500 active:bg-teal-300 px-4 py-2 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <FiLoader />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <FiSend />
                      <span>Generate</span>
                    </>
                  )}
                </button>
              </div>
            </footer>
          </section>
          <aside className="w-96 h-full flex flex-col gap-4 border-l border-gray-300 px-4 py-2 overflow-y-auto">
            <h4>System #1</h4>
            <div>
              <div>
                <select
                  disabled={isBusy}
                  name="config1.model"
                  value={values.config1.model}
                  onChange={async (e) => {
                    await handleChange(e);
                    saveConversation();
                  }}
                  className="w-full p-2 mb-2"
                >
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                </select>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p>Temperature</p>
                  <p>{values.config1.temperature}</p>
                </div>
                <input
                  disabled={isBusy}
                  name="config1.temperature"
                  value={values.config1.temperature}
                  onChange={async (e) => {
                    await handleChange(e);
                    saveConversation();
                  }}
                  className="w-full accent-teal-700"
                  type="range"
                  step="0.01"
                  min="0"
                  max="1"
                  // bind:value={config1.temperature}
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p>Maximum Length</p>
                  <p>{values.config1.maxLength}</p>
                </div>
                <input
                  disabled={isBusy}
                  name="config1.maxLength"
                  value={values.config1.maxLength}
                  onChange={async (e) => {
                    await handleChange(e);
                    saveConversation();
                  }}
                  className="w-full accent-teal-700"
                  type="range"
                  step="1"
                  min="1"
                  max="2048"
                  // bind:value={config1.max_length}
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p>Top P</p>
                  <p>{values.config1.top_p}</p>
                </div>
                <input
                  disabled={isBusy}
                  name="config1.top_p"
                  value={values.config1.top_p}
                  onChange={async (e) => {
                    await handleChange(e);
                    saveConversation();
                  }}
                  className="w-full accent-teal-700"
                  type="range"
                  step="0.01"
                  min="0"
                  max="1"
                  // bind:value={config1.top_p}
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p>Frequency Penalty</p>
                  <p>{values.config1.frequency_penalty}</p>
                </div>
                <input
                  disabled={isBusy}
                  name="config1.frequency_penalty"
                  value={values.config1.frequency_penalty}
                  onChange={async (e) => {
                    await handleChange(e);
                    saveConversation();
                  }}
                  className="w-full accent-teal-700"
                  type="range"
                  step="0.01"
                  min="0"
                  max="2"
                  // bind:value={config1.frequency_penalty}
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p>Presence Penalty</p>
                  <p>{values.config1.presence_penalty}</p>
                </div>
                <input
                  disabled={isBusy}
                  name="config1.presence_penalty"
                  value={values.config1.presence_penalty}
                  onChange={async (e) => {
                    await handleChange(e);
                    saveConversation();
                  }}
                  className="w-full accent-teal-700"
                  type="range"
                  step="0.01"
                  min="0"
                  max="2"
                  // bind:value={config1.presence_penalty}
                />
              </div>
            </div>
            <hr />
            <h4>System #2</h4>
            <div>
              <div>
                <select /*bind:value={model2}*/
                  disabled={isBusy}
                  className="w-full p-2 mb-2"
                  name="config2.model"
                  value={values.config2.model}
                  onChange={async (e) => {
                    await handleChange(e);
                    saveConversation();
                  }}
                >
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                </select>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p>Temperature</p>
                  <p>{values.config2.temperature}</p>
                </div>
                <input
                  disabled={isBusy}
                  name="config2.temperature"
                  value={values.config2.temperature}
                  onChange={async (e) => {
                    await handleChange(e);
                    saveConversation();
                  }}
                  className="w-full accent-teal-700"
                  type="range"
                  step="0.01"
                  min="0"
                  max="1"
                  // bind:value={config2.temperature}
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p>Maximum Length</p>
                  <p>{values.config2.maxLength}</p>
                </div>
                <input
                  disabled={isBusy}
                  name="config2.maxLength"
                  value={values.config2.maxLength}
                  onChange={async (e) => {
                    await handleChange(e);
                    saveConversation();
                  }}
                  className="w-full accent-teal-700"
                  type="range"
                  step="1"
                  min="1"
                  max="2048"
                  // bind:value={config2.max_length}
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p>Top P</p>
                  <p>{values.config2.top_p}</p>
                </div>
                <input
                  disabled={isBusy}
                  name="config2.top_p"
                  value={values.config2.top_p}
                  onChange={async (e) => {
                    await handleChange(e);
                    saveConversation();
                  }}
                  className="w-full accent-teal-700"
                  type="range"
                  step="0.01"
                  min="0"
                  max="1"
                  // bind:value={config2.top_p}
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p>Frequency Penalty</p>
                  <p>{values.config2.frequency_penalty}</p>
                </div>
                <input
                  disabled={isBusy}
                  name="config2.frequency_penalty"
                  value={values.config2.frequency_penalty}
                  onChange={async (e) => {
                    await handleChange(e);
                    saveConversation();
                  }}
                  className="w-full accent-teal-700"
                  type="range"
                  step="0.01"
                  min="0"
                  max="2"
                  // bind:value={config2.frequency_penalty}
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p>Presence Penalty</p>
                  <p>{values.config2.presence_penalty}</p>
                </div>
                <input
                  disabled={isBusy}
                  name="config2.presence_penalty"
                  value={values.config2.presence_penalty}
                  onChange={async (e) => {
                    await handleChange(e);
                    saveConversation();
                  }}
                  className="w-full accent-teal-700"
                  type="range"
                  step="0.01"
                  min="0"
                  max="2"
                  // bind:value={config2.presence_penalty}
                />
              </div>
            </div>
          </aside>
        </Form>
      )}
    </Formik>
  );
}
