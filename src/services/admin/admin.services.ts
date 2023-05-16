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


