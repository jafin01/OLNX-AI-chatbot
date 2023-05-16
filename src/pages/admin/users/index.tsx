/* eslint-disable react-hooks/exhaustive-deps */
import AdminUsers from "@/components/Admin/Users";
import UserProfileCard from "@/components/Admin/Users/UserProfileCard";
import { useAdminStore } from "@/stores/admin";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Templates() {
  const [isRedirect, setIsRedirect] = useState<boolean>(false);
  const [modelUser, setModelUser] = useState({
    user: {},
    isModelOpen: false,
  })
  const router = useRouter();
  const { push } = router;
  const { users }: any = useAdminStore();

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
      { modelUser.isModelOpen && (
        <UserProfileCard modelUser={modelUser} setModelUser={setModelUser} handleRedirect={handleRedirectedPreview} />
      )}
      <AdminUsers users={users} showUserInfo={showUserInfo} />
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
