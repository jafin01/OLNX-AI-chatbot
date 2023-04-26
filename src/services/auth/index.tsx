import axios from "axios";

export function authorizeUser({ email, password }: { email: string, password: string }) {
  return new Promise (async(resolve, reject) => {
    try {
      const res: any = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        {
          email,
          password,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  })
}