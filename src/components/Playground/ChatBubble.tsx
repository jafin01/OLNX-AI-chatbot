import { useEffect, useRef } from "react";

type Props = {
  onClickName: () => void;
  removeMessage: () => void;
  onChange: (s: string) => void;
  name: string;
  message: string;
};
export default function PlaygroundChatBubble({
  onClickName,
  name,
  message,
  removeMessage,
  onChange,
}: Props) {
  return (
    <div className="bg-white hover:bg-gray-100 p-4 w-full flex items-center gap-4 group">
      <button
        type="button"
        className="p-2 rounded-sm bg-gray-300 cursor-pointer"
        onClick={onClickName}
      >
        {name}
      </button>
      <ContentEditable
        setContent={onChange}
        content={message}
        //   bind:textContent={message}
        className="rounded-sm outline-purple-500 p-2 flex-1 bg-transparent resize-none h-auto"
        // placeholder="Enter an assistant message here."
      />
      <button
        type="button"
        className="h-6 w-6 group-hover:block hidden"
        onClick={removeMessage}
      >
        {/* <MinusIcon /> */}-
      </button>
    </div>
  );
}

type ContentEditableProps = {
  content: string;
  setContent: (s: string) => void;
  className?: string;
};

function ContentEditable({
  content,
  setContent,
  className,
}: ContentEditableProps) {
  const editableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editableRef.current) {
      editableRef.current.innerHTML = content;
    }
  }, []);

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection) {
      return {
        range: selection.getRangeAt(0),
        activeElement: document.activeElement,
      };
    }
    return null;
  };

  const restoreSelection = (savedSelection: any) => {
    const { range, activeElement } = savedSelection;
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
      activeElement?.focus();
    }
  };

  const handleChange = () => {
    if (editableRef.current) {
      setContent(editableRef.current.innerText || "");
    }
  };

  return (
    <p
      ref={editableRef}
      contentEditable
      className={className}
      onInput={handleChange}
      // dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
