/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Formik } from "formik";
import PlaygroundChatBubble from "./ChatBubble";
import PlaygroundAddChatBubble from "./AddChatBubble";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
// import { useConversationStore } from "@/stores/conversation";
import { FiSend, FiLoader } from "react-icons/fi";
import {
  AccordionList,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@tremor/react";
import { GoPlus, GoSettings } from "react-icons/go";
import AssistantConfig from "./AssistantConfig";
import { useQuery } from "@tanstack/react-query";

export type Message = {
  role: "Assistant #1" | "Assistant #2";
  message: string;
};

let dummy_configs = [
  {
    id: 1,
    name: "Assistant #1",
    model: "gpt-4",
    temperature: "0.7",
    maxLength: "256",
    top_p: "1",
    frequency_penalty: "0",
    presence_penalty: "0",
  },
  {
    id: 2,
    name: "Assistant #2",
    model: "gpt-4",
    temperature: "0.7",
    maxLength: "256",
    top_p: "1",
    frequency_penalty: "0",
    presence_penalty: "0",
  },
  {
    id: 3,
    name: "Assistant #3",
    model: "gpt-4",
    temperature: "0.7",
    maxLength: "256",
    top_p: "1",
    frequency_penalty: "0",
    presence_penalty: "0",
  },
];

type Config = {
  id: number;
  name: string;
  model: string;
  temperature: string;
  maxLength: string;
  top_p: string;
  frequency_penalty: string;
  presence_penalty: string;
  [key: number]: string;
};

const msgs: any = [
  {
    role: "Assistant #1",
    message: "Hello.",
  },
  {
    role: "Assistant #2",
    message: "Hello, I am an assistant.",
  },
  {
    role: "Assistant #3",
    message: "Hello, I am an assistant.",
  },
];

export default function PlaygroundContent({
  name,
  setIsBusy,
  isBusy,
  initialValues,
}: // msgs,
{
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
  const [configModel, setConfigModel] = useState<any>({
    isOpen: false,
    name: "",
    index: -1,
    model: "gpt-4",
    temperature: "0.7",
    maxLength: "256",
    top_p: "1",
    frequency_penalty: "0",
    presence_penalty: "0",
  });
  const [loading, setLoading] = useState(false);
  const [itteration, setItteration] = useState(5);
  const [configs, setConfigs] = useState<any[]>(dummy_configs);

  useEffect(() => {
    if (msgs) {
      setMessages(msgs);
    }
  }, []);

  useEffect(() => {
    setIsBusy(loading);
  }, [loading]);

  const formikRef = useRef<any>();

  // useEffect(() => {
  //   if (formikRef) {
  //     // saveConversation();
  //   }
  // }, [formikRef]);

  useEffect(() => {
    // saveConversation();
    async function genRes() {
      await generateResponse(formikRef.current.values);
    }
    if (itteration < formikRef.current.values.responses_to_generate - 1) {
      genRes();
      setItteration((prev) => prev + 1);
    }
  }, [messages]);

  // useEffect(() => {
  //   if (itteration < formikRef.current.values.responses_to_generate) {
  //     generateResponse(formikRef.current.values);
  //   }
  // }, [itteration]);

  // const setConversation = useConversationStore(
  //   (state: any) => state.setConversation
  // );

  // a function to save the conversation
  // async function saveConversation() {
  //   await setConversation({
  //     configs: configs,
  //     messages: messages,
  //     name: name,
  //   });
  // }

  // a function that deletes a particular message from the messages array based on index
  function deleteMessage(index: number) {
    setMessages((prev) => prev.filter((_, i) => i !== index));
  }

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

  function changeRole(index: number) {
    setMessages((prev: any) => {
      const currentRole = prev[index].role;
      const currentRoleIndex = configs.findIndex(
        (config) => config.name === currentRole
      );
      const nextRoleIndex = (currentRoleIndex + 1) % configs.length;
      const nextRole = configs[nextRoleIndex].name;

      return [
        ...prev.slice(0, index),
        {
          ...prev[index],
          role: nextRole,
        },
        ...prev.slice(index + 1),
      ];
    });
  }

  function addMessage() {
    const lastMessage = messages[messages.length - 1];

    if (lastMessage) {
      setMessages((prev: any) => {
        const configIndex =
          prev.length >= configs.length
            ? (prev.length - configs.length) % configs.length
            : prev.length;

        return [
          ...prev,
          {
            role: configs[configIndex].name,
            message: "",
          },
        ];
      });
    } else {
      setMessages((prev: any) => [
        ...prev,
        { role: configs[0] ? configs[0].name : "Assistant #1", message: "" },
      ]);
    }
  }

  // a function that calls an API over post
  async function generateResponses(values: any) {
    setLoading(true);

    // call generateResponse based on the number of responses to generate
    // for (let i = 0; i < values.responses_to_generate; i++) {
    //   await generateResponse(values);
    // }

    await generateResponse(values);

    setLoading(false);
    setItteration(0);
  }

  function addAssistant() {
    setConfigs((prev: any) => [
      ...prev,
      {
        name: `Assistant #${prev.length + 1}`,
        id: prev.length + 1,
        model: "gpt-4",
        temperature: "0.7",
        maxLength: "256",
        top_p: "1",
        frequency_penalty: "0",
        presence_penalty: "0",
      },
    ]);
  }

  async function generateResponse(values: any) {
    setLoading(true);
    const lastMessage = messages[messages.length - 1];

    const generatedMessages = messages.map((message) => ({
      role: message.role === lastMessage.role ? "user" : "assistant",
      content: message.message,
    }));

    const lastAssistantIndex = configs.findIndex(
      (config) => config.name === lastMessage.role
    );

    const nextAssistantIndex =
      lastAssistantIndex + 1 >= configs.length ? 0 : lastAssistantIndex + 1;
    const nextAssistantRole = configs[nextAssistantIndex].name;

    const nextConfig = configs[nextAssistantIndex];
    const systemMessage =
      configs[nextAssistantIndex][`system_${nextConfig.id}`];

    console.log("nextConfig", nextConfig)

    const model = configs[lastAssistantIndex].model;

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
        temperature: +nextConfig.temperature,
        top_p: +nextConfig.top_p,
        frequency_penalty: +nextConfig.frequency_penalty,
        presence_penalty: +nextConfig.presence_penalty,
        max_tokens: +nextConfig.maxLength,
      })
      .then(async (res) => {
        const newMessage = res.data.choices[0].message.content;
        await setMessages((prevMessages: any) => [
          ...prevMessages,
          {
            role: nextAssistantRole,
            message: newMessage,
          },
        ]);
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
      configs: [],
    };

    configs.map((config, index) => {
      intValues.configs.push({
        name: config.name,
        id: config.id,
        [`system_${config.id}`]: "",
        model: "gpt-3.5-turbo",
        temperature: "0.7",
        maxLength: "256",
        top_p: "1",
        frequency_penalty: "0",
        presence_penalty: "0",
      });
    });
  } else {
    intValues = initialValues;
  }

  function saveAssistantConfig(click = false) {
    setConfigs((prev: any) => {
      const configIndex = prev.findIndex(
        (config: any) => config.id === configModel.id
      );
      const newConfigs = [...prev];
      newConfigs[configIndex] = {
        name: configModel.name,
        id: configModel.id,
        [`system_${configModel.id}`]: configModel[`system_${configModel.id}`],
        model: configModel.model,
        temperature: configModel.temperature,
        maxLength: configModel.maxLength,
        top_p: configModel.top_p,
        frequency_penalty: configModel.frequency_penalty,
        presence_penalty: configModel.presence_penalty,
      };
      return newConfigs;
    });

    if (click) {
      setConfigModel((prev: any) => ({
        ...prev,
        isOpen: false,
      }));
    }
  }

  useEffect(() => {
    console.log("configs", configs);
  }, [configs]);

  useEffect(() => {
    console.log("configModel", configModel);
  }, [configModel]);

  return (
    <>
      {configModel.isOpen && (
        <AssistantConfig
          configModel={configModel}
          setConfigModel={setConfigModel}
          formikRef={formikRef}
          saveAssistantConfig={saveAssistantConfig}
          intValues={configs[configModel.index]}
        />
      )}

      <Formik
        initialValues={intValues}
        innerRef={formikRef}
        onSubmit={generateResponses}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form
            className="px-6 flex gap-6"
            style={{ height: "calc(100vh - 8rem)" }}
          >
            <aside className="w-96 h-full flex flex-col gap-4 py-6">
              <AccordionList className="w-full outline-none h-full overflow-y-auto">
                {configs.map((config, index) => {
                  return (
                    <Accordion key={config.id} className="w-full">
                      <AccordionHeader className="font-semibold font-mono">
                        {config.name}
                      </AccordionHeader>

                      <AccordionBody className="h-64">
                        <div className="p-4 h-full border border-gray-300 rounded-sm flex flex-col">
                          <textarea
                            onChange={(e) => {
                              handleChange(e);
                              setConfigModel({
                                ...configModel,
                                id: config.id,
                                index,
                                name: config.name,
                                [`system_${config.id}`]: e.target.value,
                              });

                              saveAssistantConfig();
                              // saveConversation();
                            }}
                            disabled={isBusy}
                            onBlur={handleBlur}
                            name="system"
                            className="h-full w-full resize-none outline-none"
                            placeholder="You are a helpful assistant."
                          />
                          <button
                            disabled={isBusy}
                            type="button"
                            className="bg-teal-700 py-2 text-white rounded flex justify-center items-center gap-2 disabled:bg-gray-300 disabled:text-gray-500"
                            onClick={() => {
                              setConfigModel({
                                id: config.id,
                                isOpen: true,
                                name: config.name,
                                index,
                                [`system_${config.id}`]:
                                  config[`system_${config.id}`],
                                model: config.model,
                                temperature: config.temperature,
                                maxLength: config.maxLength,
                                top_p: config.top_p,
                                frequency_penalty: config.frequency_penalty,
                                presence_penalty: config.presence_penalty,
                              });
                            }}
                          >
                            <span>
                              <GoSettings />
                            </span>
                            <span>Config</span>
                          </button>
                        </div>
                      </AccordionBody>
                    </Accordion>
                  );
                })}
              </AccordionList>

              <button
                type="button"
                disabled={isBusy}
                className="bg-teal-700 py-2 text-white rounded flex justify-center items-center gap-2 disabled:bg-gray-300 disabled:text-gray-500"
                onClick={addAssistant}
              >
                <span>
                  <GoPlus />
                </span>
                <span>Add Assistant</span>
              </button>
            </aside>
            <section className="w-full flex flex-col gap-2 py-6">
              <div className="w-full h-full flex-1 overflow-y-auto">

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
                      // saveConversation();
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
          </Form>
        )}
      </Formik>
    </>
  );
}
