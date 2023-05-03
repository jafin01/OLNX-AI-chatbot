import axios from "axios";

export async function getUser({ token }: { token: string }) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
