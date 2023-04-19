import AdminHome from "@/components/Admin/Home";
import { LoadingPage } from "@/components/Loading";
import playgrounds from "@/pages/playgrounds";
import templates from "@/pages/templates";
import { Grid, Card, Flex, Icon, Metric, Text, Button } from "@tremor/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiActivity, FiBox, FiMessageSquare, FiUser } from "react-icons/fi";

export default function Dashboard({
  playgrounds,
  templates,
  users,
}: {
  playgrounds: number;
  templates: number;
  users: number;
}) {
  const [playgroundsCount, setPlaygroundsCount] = useState<number>(0);
  const [templatesCount, setTemplatesCount] = useState<number>(0);
  const [usersCount, setUsersCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { push } = router;

  async function loadAdmin() {
    setLoading(true);
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        // setPlaygrounds(res.data.playgrounds.data);
        // setTemplates(res.data.templates.data);
        // setUsers(res.data.users.data);
        setPlaygroundsCount(res.data.playgrounds_count);
        setTemplatesCount(res.data.templates_count);
        setUsersCount(res.data.users_count);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }

  useEffect(() => {
    if (!window.localStorage.getItem("accessToken")) {
      push("/login");
    }
    loadAdmin();
  }, []);


  return (
    <div className="bg-gray-100 h-screen px-5">
      {loading ? (
        <LoadingPage />
      ) : (
        <AdminHome playgrounds={playgroundsCount} templates={templatesCount} users={usersCount}  />
      )}
    </div>
  );
}
