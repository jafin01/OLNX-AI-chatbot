import AdminHome from "@/components/Admin/Home";
import AdminPlaygrounds from "@/components/Admin/Playgrounds";
import AdminSettings from "@/components/Admin/Settings";
import AdminTemplates from "@/components/Admin/Templates";
import AdminUsers from "@/components/Admin/Users";
import { LoadingPage } from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { TabList, Tab } from "@tremor/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FiActivity,
  FiBox,
  FiHome,
  FiKey,
  FiSettings,
  FiUsers,
} from "react-icons/fi";

export default function Admin() {
  //   const [accessToken, setAccessToken] = useState<string | null>(null);
  const { push } = useRouter();
  const [playgrounds, setPlaygrounds] = useState<number>(0);
  const [templates, setTemplates] = useState<number>(0);
  const [users, setUsers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [tab, setTab] = useState<string>("dashboard");

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
          <h1 className="text-2xl font-mono text-gray-500 uppercase flex items-center gap-2">
            <FiKey />
            <span>Admin</span>
          </h1>
          <TabList
            defaultValue={tab}
            onValueChange={(value) => {
              setTab(value);
            }}
            className="my-6"
          >
            <Tab value="dashboard" text="Dashboard" icon={FiHome} />
            <Tab value="playgrounds" text="Playgrounds" icon={FiActivity} />
            <Tab value="templates" text="Templates" icon={FiBox} />
            <Tab value="users" text="Users" icon={FiUsers} />
            <Tab value="settings" text="Settings" icon={FiSettings} />
          </TabList>
          {tab === "dashboard" && (
            <AdminHome
              playgrounds={playgrounds}
              templates={templates}
              users={users}
            />
          )}
          {tab === "playgrounds" && <AdminPlaygrounds />}
          {tab === "templates" && <AdminTemplates />}
          {tab === "users" && <AdminUsers />}
          {tab === "settings" && <AdminSettings />}
        </section>
      )}
    </>
  );
}
