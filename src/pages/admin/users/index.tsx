/* eslint-disable react-hooks/exhaustive-deps */
import AdminUsers from "@/components/Admin/Users";
import UserProfileCard from "@/components/Admin/Users/UserProfileCard";
import { LoadingPage } from "@/components/Loading";
import { loadAdmin } from "@/services/admin/admin.services";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Templates() {
  const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState<boolean>(false);
  const [isRedirect, setIsRedirect] = useState<boolean>(false);
  const [modelUser, setModelUser] = useState({
    user: {},
    isModelOpen: false,
  })
  const router = useRouter();
  const { push } = router;

  const { isLoading, error, data }: { isLoading: boolean, error: any, data: any} = useQuery({
    queryKey: ["fetch-admin"],
    queryFn: loadAdmin,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data) {
      setUsers(data.users.data)
    } else {
      console.log(error);
    }
  }, [error, data]);

  useEffect(() => {
    if (!window.localStorage.getItem("accessToken")) {
      push("/login");
    }
  }, []);

  function handleRedirectedPreview () {
    if (isRedirect) {
      setIsRedirect(false);
      push("/admin/playgrounds")
    }
  }

  async function showUserInfo(id: number) {
    const user = users.filter((user: any) => user.id === id);
    setModelUser({
      user: user[0],
      isModelOpen: true,
    })
  }

  useEffect(() => {
    if (router?.query?.userId) {
      setIsRedirect(true);
      showUserInfo(parseInt(router?.query?.userId as string))
    }
  }, [users])

  return (
    <div className="px-5 bg-gray-100 h-screen">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          { modelUser.isModelOpen && (
            <UserProfileCard modelUser={modelUser} setModelUser={setModelUser} handleRedirect={handleRedirectedPreview} />
          )}
          <AdminUsers users={users} showUserInfo={showUserInfo} />
        </>
      )}
  </div>
  );
}
