import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { LoadingPage } from "@/components/Loading";
import notify from "react-hot-toast";

export default function Logout() {
  const { push } = useRouter();
  useEffect(() => {
    if (window.localStorage.getItem("accessToken")) {
      const toastLoadingId = notify.loading("Logging you out...");
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
          window.localStorage.removeItem("accessToken");
          push("/login");
          // console.log(err);
        });
      notify.dismiss(toastLoadingId);
      notify.success("Logged out successfully!");
    } else {
      push("/login");
      notify.error("You are not logged in!");
    }
  });
  return (
    <>
      <LoadingPage text="Securely Logging You Out..." fullHeight={true} />
    </>
  );
}
