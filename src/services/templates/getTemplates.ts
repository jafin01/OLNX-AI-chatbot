import axios from "axios";

export async function getTemplates({ token }: { token: string }) {
  console.log(token);
  try {
    const response = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/api/templates`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
  
}