import axios from "axios";

interface IGetOnePlayground {
  id: string | string[] | number | null;
  token: string;
}

export const getOnePlayground = async ({id, token}: IGetOnePlayground) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/conversation/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};