import axios from "axios";

export function loadAdmin() {
  return new Promise(async (resolve, reject): Promise<any> => {
    try {
      console.log("fetching...");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "accessToken"
            )}`,
            Accept: "application/json",
          },
        }
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
