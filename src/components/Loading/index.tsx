import { FiLoader } from "react-icons/fi";

export function LoadingPage({
  fullHeight,
  text,
}: {
  fullHeight?: boolean;
  text?: string;
}) {
  return (
    <div
      className="flex w-full h-full items-center justify-center text-gray-500 bg-gray-100 font-mono"
      style={{ minHeight: `calc(${fullHeight ? "100vh - 4rem" : "100vh"})` }}
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <FiLoader size={32} className="animate-spin" />
        <span>{text ? text : "Loading..."}</span>
      </div>
    </div>
  );
}
