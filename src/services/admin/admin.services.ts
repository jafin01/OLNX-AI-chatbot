import axios from "axios";

export function loadAdmin() {
  return new Promise(async (resolve, reject): Promise<any> => {
    try {
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

export async function savePlayground({messages, configs, template, id} : { messages: any, configs: any, template: boolean, id: any}) {
  return new Promise(async (resolve, reject) => {
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
      resolve(res.data);
    } catch (err) {
      reject(err);
    }
  });
}
