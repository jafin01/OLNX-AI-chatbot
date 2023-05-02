import { useRouter } from "next/router";
import { LoadingPage } from "@/components/Loading";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

export default function Logout() {
  const { push } = useRouter();
  const { data: session } = useSession();

  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return await logoutUser({ token: session?.user.token || "" });
    },
    enabled: !!session?.user.token,
    retry: true,
    onSuccess: (data: any) => {
      push("/login")
      console.log(data);
    },
    onError: (error: any) => {
      console.log(error);
    }
  });
  
  return (
    <>
      <LoadingPage text="Securely Logging You Out..." fullHeight={true} />
    </>
  );
}
