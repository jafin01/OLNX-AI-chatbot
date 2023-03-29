import { LoadingPage } from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { Card, Flex, Grid, Icon, Text, Metric } from "@tremor/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiActivity, FiKey, FiUser } from "react-icons/fi";

export default function Admin() {
  //   const [accessToken, setAccessToken] = useState<string | null>(null);
  const { push } = useRouter();
  const [playgrounds, setPlaygrounds] = useState<number>(0);
  const [templates, setTemplates] = useState<number>(0);
  const [users, setUsers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

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
        setPlaygrounds(res.data.playgrounds);
        setTemplates(res.data.templates);
        setUsers(res.data.users);
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
  }, [push]);

  return (
    <>
      <Navbar />
      {loading ? (
        <LoadingPage />
      ) : (
        <section
          className="p-6 bg-gray-100"
          style={{ minHeight: "calc(100vh - 4rem);" }}
        >
          <h1 className="mb-6 text-2xl font-mono text-gray-500 uppercase flex items-center gap-2">
            <FiKey />
            <span>Admin</span>
          </h1>
          <Grid numColsSm={2} numColsLg={3} className="gap-6">
            <Card decoration="top" decorationColor={"teal"}>
              <Flex justifyContent="start" className="space-x-4">
                <Icon
                  icon={FiActivity}
                  variant="light"
                  size="xl"
                  color={"teal"}
                />
                <div className="truncate">
                  <Text>Playgrounds</Text>
                  <Metric className="truncate">{playgrounds}</Metric>
                </div>
              </Flex>
            </Card>
            <Card decoration="top" decorationColor={"rose"}>
              <Flex justifyContent="start" className="space-x-4">
                <Icon
                  icon={FiActivity}
                  variant="light"
                  size="xl"
                  color={"rose"}
                />
                <div className="truncate">
                  <Text>Templates</Text>
                  <Metric className="truncate">{templates}</Metric>
                </div>
              </Flex>
            </Card>
            <Card decoration="top" decorationColor={"lime"}>
              <Flex justifyContent="start" className="space-x-4">
                <Icon icon={FiUser} variant="light" size="xl" color={"lime"} />
                <div className="truncate">
                  <Text>Users</Text>
                  <Metric className="truncate">{users}</Metric>
                </div>
              </Flex>
            </Card>
          </Grid>
        </section>
      )}
    </>
  );
}
