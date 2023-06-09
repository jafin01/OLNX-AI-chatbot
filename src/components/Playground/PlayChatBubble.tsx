import React, { useState } from "react";
import { FiPause, FiPlay } from "react-icons/fi";

type PlayPauseChatBubbleProps = {
  isPlaying: boolean;
  togglePlay: () => void;
};

export default function PlayPauseChatBubble({
  isPlaying,
  togglePlay,
}: PlayPauseChatBubbleProps) {

  console.log(isPlaying);

  return (
    <div
      className={`flex items-center rounded-full py-2 px-2 overflow-hidden transition-all duration-300 ${
        !isPlaying ? "bg-green-200" : "bg-red-300"
      }`}
      style={{ width: !isPlaying ? "40px" : "80px" }}
    >
      <div className="flex items-center justify-center w-full h-full" onClick={togglePlay}>
        {!isPlaying ? <FiPlay width={20} height={20} /> : <FiPause />}
      </div>
    </div>
  );
}
