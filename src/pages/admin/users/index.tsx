/* eslint-disable react-hooks/exhaustive-deps */
import AdminUsers from "@/components/Admin/Users";
import UserProfileCard from "@/components/Admin/Users/UserProfileCard";
import { LoadingPage } from "@/components/Loading";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Templates() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modelUser, setModelUser] = useState({
    user: {},
    isModelOpen: false,
  })
  
  const { push } = useRouter();

  async function loadAdmin() {
    setLoading(true);
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
          Accept: "application/json",
        },
      })
      .then((res: any) => {
        setUsers(res.data.users.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
    setLoading(false);
  }

  useEffect(() => {
    if (!window.localStorage.getItem("accessToken")) {
      push("/login");
    }
    // push(route)
    loadAdmin();
  }, []);

  function showUserInfo(id: number) {
    const user = users.filter((user: any) => user.id === id);
    setModelUser({
      user: user[0],
      isModelOpen: true
    })
  }

  return (
    <div className="px-5 bg-gray-100 h-screen">
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          { modelUser.isModelOpen && (
            <UserProfileCard modelUser={modelUser} setModelUser={setModelUser} />
          )}
          <AdminUsers users={users} showUserInfo={showUserInfo} />
        </>
      )}
  </div>
  );
}
