import axios from "axios";
import { Howl, Howler } from "howler";

export const convertTextToSpeech = async (
  text: any,
  callBack: () => void,
) => {
  const apiKey = process.env.NEXT_PUBLIC_SPEECH_API; 
  const voiceId = process.env.NEXT_PUBLIC_VOICE_ID; 

  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text: text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 1,
          similarity_boost: 1
        }
      },
      {
        headers: {
          "xi-api-key": `${apiKey}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );
      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: "audio/mpeg" });
      
      // Create a URL for the Blob
      const audioURL = URL.createObjectURL(blob);
      console.log(audioURL)

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
