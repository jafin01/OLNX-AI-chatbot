import { Form, Formik } from "formik";
import PlaygroundChatBubble from "./ChatBubble";
import PlaygroundAddChatBubble from "./AddChatBubble";
import { useState } from "react";
import axios from "axios";

type Message = {
  role: "Assistant #1" | "Assistant #2";
  message: string;
};

export default function PlaygroundContent() {
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
    // get last message
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
          { role: "system", content: systemMessage },
          ...generatedMessages,
        ],
        model: model,
      })
      .then((res) => {
        console.log({ res });
        const newMessage = res.data.choices[0].message.content;
        setMessages([
          ...messages,
          {
            role:
              lastMessage.role === "Assistant #1"
                ? "Assistant #2"
                : "Assistant #1",
            message: newMessage,
          },
        ]);
      })
      .catch((err) => {
        console.log({ err });
      });
  }

  const initialValues = {
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

  // const validationSchema = {
  //   responses_to_generate: Yup.number().required("Required")
  // };
  return (
    <Formik
      initialValues={initialValues}
      //   validationSchema={validationSchema}
      onSubmit={generateResponses}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form
          className="p-6 flex gap-6"
          style={{ height: "calc(100vh - 8rem)" }}
        >
          <aside className="w-96 h-full flex flex-col gap-4">
            <div className="p-4 h-full border border-gray-300 rounded-sm flex flex-col">
              <h4 className="font-semibold font-mono">System: Assistant #1</h4>
              <textarea
                onChange={handleChange}
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
                onChange={handleChange}
                onBlur={handleBlur}
                name="config2.system"
                value={values.config2.system}
                className="h-full w-full resize-none outline-none"
                placeholder="You are a helpful assistant."
                //   bind:value={system2}
              />
            </div>
          </aside>
          <section className="w-full flex flex-col gap-2">
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
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.responses_to_generate}
                  // bind:value={responses_to_generate}
                />
                <button
                  type="submit"
                  // disabled={is_generation}
                  className="bg-teal-700 text-white rounded-sm hover:bg-teal-500 active:bg-teal-300 px-4 py-2"
                >
                  {/* {is_generation ? "Generating..." : "Generate"} */}{" "}
                  Generate
                </button>
              </div>
            </footer>
          </section>
          <aside className="w-96 h-full flex flex-col gap-4 border-l border-gray-300 p-4">
            <h4>System #1</h4>
            <div>
              <div>
                <select
                  name="config1.model"
                  value={values.config1.model}
                  onChange={handleChange}
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
                  name="config1.temperature"
                  value={values.config1.temperature}
                  onChange={handleChange}
                  className="w-full"
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
                  name="maxLength1"
                  value={values.config1.maxLength}
                  onChange={handleChange}
                  className="w-full"
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
                  name="top_p1"
                  value={values.config1.top_p}
                  onChange={handleChange}
                  className="w-full"
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
                  name="frequency_penalty1"
                  value={values.config1.frequency_penalty}
                  onChange={handleChange}
                  className="w-full"
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
                  name="presence_penalty1"
                  value={values.config1.presence_penalty}
                  onChange={handleChange}
                  className="w-full"
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
                  className="w-full p-2 mb-2"
                  name="gpt_model2"
                  value={values.config2.model}
                  onChange={handleChange}
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
                  name="temperature2"
                  value={values.config2.temperature}
                  onChange={handleChange}
                  className="w-full"
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
                  name="maxLength2"
                  value={values.config2.maxLength}
                  onChange={handleChange}
                  className="w-full"
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
                  name="top_p2"
                  value={values.config2.top_p}
                  onChange={handleChange}
                  className="w-full"
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
                  name="frequency_penalty2"
                  value={values.config2.frequency_penalty}
                  onChange={handleChange}
                  className="w-full"
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
                  name="presence_penalty2"
                  value={values.config2.presence_penalty}
                  onChange={handleChange}
                  className="w-full"
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
