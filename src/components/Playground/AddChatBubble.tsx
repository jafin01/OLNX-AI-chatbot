type Props = {
  onClick: () => void;
};
export default function PlaygroundAddChatBubble({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-white hover:bg-gray-100 p-4 w-full flex items-center gap-4"
    >
      <div className="h-6 w-6">{/* <PlusIcon /> */}+</div>
      <div>Add message</div>
    </button>
  );
}
