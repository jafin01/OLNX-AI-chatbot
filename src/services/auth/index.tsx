import axios from "axios";
import Cookies from "js-cookie";

export async function authorizeUser({ email, password }: { email: string, password: string }) {
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
      return {
        user: {
          ...res.data.user,
          token: res.data.token,
        }
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
}