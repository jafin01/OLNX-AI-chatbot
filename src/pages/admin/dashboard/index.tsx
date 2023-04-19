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
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="bg-gray-100 h-screen">
          <Grid numColsSm={2} numColsLg={3} className="gap-6 px-8 justify-around">
            <Card decoration="top" decorationColor={"teal"}>
              <Flex justifyContent="start" className="space-x-4">
                <Icon
                  icon={FiMessageSquare}
                  variant="light"
                  size="xl"
                  color={"teal"}
                />
                <div className="truncate">
                  <Text>Playgrounds</Text>
                  <Metric className="truncate">{playgroundsCount}</Metric>
                </div>
              </Flex>
              {/* <div className="text-right">
                <Button onClick={} size="xs" variant="light" className="mt-4">
                  View all Playgrounds
                </Button>
              </div> */}
            </Card>
            <Card decoration="top" decorationColor={"rose"}>
              <Flex justifyContent="start" className="space-x-4">
                <Icon icon={FiBox} variant="light" size="xl" color={"rose"} />
                <div className="truncate">
                  <Text>Templates</Text>
                  <Metric className="truncate">{templatesCount}</Metric>
                </div>
              </Flex>
            </Card>
            <Card decoration="top" decorationColor={"lime"}>
              <Flex justifyContent="start" className="space-x-4">
                <Icon icon={FiUser} variant="light" size="xl" color={"lime"} />
                <div className="truncate">
                  <Text>Users</Text>
                  <Metric className="truncate">{usersCount}</Metric>
                </div>
              </Flex>
            </Card>
          </Grid>
        </div>
      )}
    </>
  );
}
