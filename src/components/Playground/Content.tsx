export default function PlaygroundContent() {
  return (
    <main className="p-6 flex gap-6" style={{ height: "calc(100vh - 8rem)" }}>
      <aside className="w-96 h-full flex flex-col gap-4">
        <div className="p-4 h-full border border-gray-300 rounded-sm flex flex-col">
          <h4 className="font-semibold font-mono">System: Assistant #1</h4>
          <textarea
            className="h-full w-full resize-none outline-none"
            placeholder="You are a helpful assistant."
            //   bind:value={system1}
          />
        </div>
        <div className="p-4 h-full border border-gray-300 rounded-sm flex flex-col">
          <h4 className="font-semibold font-mono">System: Assistant #2</h4>
          <textarea
            className="h-full w-full resize-none outline-none"
            placeholder="You are a helpful assistant."
            //   bind:value={system2}
          />
        </div>
      </aside>
      <section className="w-full flex flex-col gap-2">
        <div className="w-full h-full flex-1 overflow-y-auto">
          {/* {#each messages as message}
		  <PlaygroundChatbubble
			onClickName={() => alternateMessageRole(message)}
			bind:name={message.role}
			bind:message={message.message}
			removeMessage={() => removeMessage(message)}
		  />
		{/each}
		<PlaygroundAddChatbubble onClick={addEmptyMessage} /> */}
        </div>
        <footer className="w-full p-4 flex h-16 items-center">
          <span className="flex-1">&nbsp;</span>
          <div className="flex items-center gap-2">
            <p className="text-gray-500 font-mono">Responses to generate:</p>
            <input
              type="number"
              className="bg-white rounded-sm p-2 w-24"
              placeholder="1-100"
              min="1"
              max="100"
              // bind:value={responses_to_generate}
            />
            <button
              // on:click={generateResponses}
              // disabled={is_generation}
              className="bg-teal-700 text-white rounded-sm hover:bg-teal-500 active:bg-teal-300 px-4 py-2"
            >
              {/* {is_generation ? "Generating..." : "Generate"} */} Generate
            </button>
          </div>
        </footer>
      </section>
      <aside className="w-96 h-full flex flex-col gap-4 border-l border-gray-300 p-4">
        <h4>System #1</h4>
        <div>
          <div>
            <select className="w-full p-2 mb-2">
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            </select>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <p>Temperature</p>
              {/* <p>{config1.temperature}</p> */}
            </div>
            <input
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
              {/* <p>{config1.max_length}</p> */}
            </div>
            <input
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
              {/* <p>{config1.top_p}</p> */}
            </div>
            <input
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
              {/* <p>{config1.frequency_penalty}</p> */}
            </div>
            <input
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
              {/* <p>{config1.presence_penalty}</p> */}
            </div>
            <input
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
            <select /*bind:value={model2}*/ className="w-full p-2 mb-2">
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            </select>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <p>Temperature</p>
              {/* <p>{config2.temperature}</p> */}
            </div>
            <input
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
              {/* <p>{config2.max_length}</p> */}
            </div>
            <input
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
              {/* <p>{config2.top_p}</p> */}
            </div>
            <input
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
              {/* <p>{config2.frequency_penalty}</p> */}
            </div>
            <input
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
              {/* <p>{config2.presence_penalty}</p> */}
            </div>
            <input
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
    </main>
  );
}
