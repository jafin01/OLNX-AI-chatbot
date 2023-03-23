export default function PlaygroundChatBubble() {
  return (
    <div className="bg-white hover:bg-gray-100 p-4 w-full flex items-center gap-4 group">
      <button
        className="p-2 rounded-sm bg-gray-300 cursor-pointer"
        //   on:click={onClickName}
      >
        {/* {name} */}Assistant #1
      </button>
      <p
        contentEditable="true"
        //   bind:textContent={message}
        className="rounded-sm outline-purple-500 p-2 flex-1 bg-transparent"
        placeholder="Enter an assistant message here."
      />
      <button
        className="h-6 w-6 group-hover:block hidden" /*on:click={removeMessage}*/
      >
        {/* <MinusIcon /> */}-
      </button>
    </div>
  );
}
