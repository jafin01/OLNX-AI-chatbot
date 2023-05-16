import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { LoadingPage } from "@/components/Loading";
import notify from "react-hot-toast";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";

export default function Logout() {
  const { push } = useRouter();

  useEffect(() => {
    const session = Cookies.get("accessToken");
    if (session) {
      const toastLoadingId = notify.loading("Logging you out...");
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/logout`,
          {},
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${session}`,
            },
          }
        )
        .then(() => {
          Cookies.remove("accessToken");
          signOut();
        })
        .catch((err) => {
          Cookies.remove("accessToken");
          push("/login");
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
