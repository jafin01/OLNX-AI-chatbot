import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Logout() {
  const { push } = useRouter();
  useEffect(() => {
    if (window.localStorage.getItem("accessToken")) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/logout`,
          {},
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${window.localStorage.getItem(
                "accessToken"
              )}`,
            },
          }
        )
        .then(() => {
          window.localStorage.removeItem("accessToken");
          push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      push("/login");
    }
  });
  return <div>Securely Logging You Out.</div>;
}
