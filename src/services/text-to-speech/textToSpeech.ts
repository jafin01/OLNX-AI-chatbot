import axios from "axios";
import { Howl, Howler } from "howler";

export const convertTextToSpeech = async (text: any, callBack: () => void) => {
  try {
    const RELAY_SERVER_API: string = process.env.NEXT_PUBLIC_ELVENLABS_RELAY_API || "";
    const { data } = await axios.post(`${RELAY_SERVER_API}/text-to-speech`, {
      text: text,
      model_id: "eleven_monolingual_v1",
      voice_settings: {
        stability: 1,
        similarity_boost: 1,
      },
      // fine_tuning: {
      //   language: "en-IN",
      // }
    });

const audioData = new Uint8Array(data.data.data);
const blob = new Blob([audioData], { type: "audio/mp3" });


console.log("audioData length:", audioData.length);

// Create a URL for the Blob
const audioURL = URL.createObjectURL(blob);
console.log("audioUrl", audioURL);

Howler.stop();

const sound = new Howl({ src: [audioURL], format: ["mp3"] });

sound.play();

sound.on("stop", () => {
  console.log("Audio Stopped");
  callBack();
});

  } catch (error) {
    console.log("Text-to-speech conversion failed:", error);
  }
};
