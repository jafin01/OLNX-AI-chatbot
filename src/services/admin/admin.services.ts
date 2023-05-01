import axios from "axios";

export async function loadAdmin({ token }: { token: string }) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function savePlayground({
  messages,
  configs,
  template,
  id,
}: {
  messages: any;
  configs: any;
  template: boolean;
  id: any;
}) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/conversation${
        id ? "/update" : ""
      }`,
      {
        messages,
        configs,
        template,
        id: id ? id : null,
      },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
          Accept: "application/json",
        },
      }
    );
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
