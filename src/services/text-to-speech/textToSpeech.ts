import axios from "axios";
import { Howl, Howler } from "howler";

export const convertTextToSpeech = async (
  text: any,
  callBack: () => void,
  soundUrl: any,
  setSoundUrl: any
) => {
  const apiKey = process.env.NEXT_PUBLIC_SPEECH_API; // Replace with your Elevenlabs API key
  const voiceID = process.env.NEXT_PUBLIC_VOICE_ID; // Replace with the ID of the voice you want to use
  const fileName = "audio.mp3"; // The name of the audio file to be saved

  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceID}`,
      {
        text: text,
        model_id: "eleven_monolingual_v1",
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

      // if(soundUrl == null) {
      //   setSoundUrl(audioURL);
      // }

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
