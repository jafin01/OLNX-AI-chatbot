import axios from "axios";

export async function getPlaygrounds({ token }: { token: string }) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/conversation`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    console.log(res.data)
    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}