import axios from "axios";

export async function savePlayground({
  messages,
  configs,
  template,
  id,
  name,
  token
}: {
  messages: any;
  configs: any;
  template: boolean;
  id: any;
  name: string;
  token: string;
}) {
  try {
    console.log("messages", messages);
    console.log("configs", configs);
    console.log("id", id);
    console.log("token", token)
    
    
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/conversation${
        id ? "/update" : ""
        }`,
      {
        messages,
        configs,
        template,
        name,
        id: id ? id : null,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return res.data;
  } catch (err: any) {
    throw new Error(err);
  }
}