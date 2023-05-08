/* eslint-disable react-hooks/exhaustive-deps */
import AdminUsers from "@/components/Admin/Users";
import UserProfileCard from "@/components/Admin/Users/UserProfileCard";
import { LoadingPage } from "@/components/Loading";
import { loadAdmin } from "@/services/admin/admin.services";
import { useAdminStore } from "@/stores/admin";
import { useQuery } from "@tanstack/react-query";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Templates() {
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState<boolean>(false);
  const [isRedirect, setIsRedirect] = useState<boolean>(false);
  const [modelUser, setModelUser] = useState({
    user: {},
    isModelOpen: false,
  })
  const router = useRouter();
  const { push } = router;
  // const { data: session } = useSession();

  const { users }: any = useAdminStore();

  // const { isLoading, error, data }: { isLoading: boolean, error: any, data: any} = useQuery({
  //   queryKey: ["fetch-admin"],
  //   queryFn: () => {
  //     return loadAdmin({ token: session?.user?.token || "" });
  //   },
  //   // staleTime: 1000 * 60 * 5,

  //   onSuccess: (data: any) => {
  //     setUsers(data.users.data);
  //   }
  // });

  // useEffect(() => {
  //   if (data) {
  //     setUsers(data.users.data)
  //   } else {
  //     console.log(error);
  //   }
  // }, [error, data]);

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
      {/* {isLoading ? (
        <LoadingPage />
      ) : (
        <> */}
          { modelUser.isModelOpen && (
            <UserProfileCard modelUser={modelUser} setModelUser={setModelUser} handleRedirect={handleRedirectedPreview} />
          )}
          <AdminUsers users={users} showUserInfo={showUserInfo} />
        {/* </>
      )} */}
  </div>
  );
}

export async function getServerSideProps({ req }: { req: any }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
