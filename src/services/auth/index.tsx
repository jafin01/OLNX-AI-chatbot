import axios from "axios";

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
      return res.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
}