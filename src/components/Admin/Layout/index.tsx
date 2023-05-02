/* eslint-disable react-hooks/exhaustive-deps */
import AdminHome from "@/components/Admin/Home";
import AdminPlaygrounds from "@/components/Admin/Playgrounds";
import AdminSettings from "@/components/Admin/Settings";
import AdminTemplates from "@/components/Admin/Templates";
import { LoadingPage } from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { loadAdmin } from "@/services/admin/admin.services";
import { useQuery } from "@tanstack/react-query";
import { TabList, Tab } from "@tremor/react";
import axios from "axios";
import { useSession } from "next-auth/react";
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

export default function AdminLayout({ route }: any) {
  const { push } = useRouter();
  const [tab, setTab] = useState<string>("dashboard");

  const { data: session } = useSession();

  const { isLoading } = useQuery({
    queryKey: ["fetch-admin"],
    queryFn: async () => {
      return await loadAdmin({ token: session?.user?.token || "" });
    },
    onSuccess: (data: any) => {
      // setPlaygrounds(data.playgrounds.data);
      // setTemplates(data.templates.data);
      // setUsers(data.users.data);
      // setPlaygroundsCount(data.playgroundsCount);
      // setTemplatesCount(data.templatesCount);
      // setUsersCount(data.usersCount);
    },
  });

  
  useEffect(() => {
    setTab(route?.split("/")[2] || "dashboard");
  }, [route]);

  return (
    <div>
      <Navbar />
      {isLoading ? (
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
            value={tab}
            defaultValue="dashboard"
            onValueChange={(value) => {
              setTab(value);
              push(`/admin/${value}`)
              // if (modelUser.isModelOpen) {
              //   setModelUser({
              //     user: null,
              //     isModelOpen: false,
              //   });
              //   push('/admin')
              // }
            }}
            className="my-6"
          >
            <Tab value="dashboard" text="Dashboard" icon={FiHome} />
            <Tab value="playgrounds" text="Playgrounds" icon={FiActivity} />
            <Tab value="templates" text="Templates" icon={FiBox} />
            <Tab value="users" text="Users" icon={FiUsers} />
            <Tab value="settings" text="Settings" icon={FiSettings} />
          </TabList>
          {/* {tab === "dashboard" && (
            <AdminHome
              playgrounds={playgroundsCount}
              templates={templatesCount}
              users={usersCount}
            />
          )} */}
          {/* {tab === "playgrounds" && (
            <AdminPlaygrounds playgrounds={playgrounds} />
          )}
          {tab === "templates" && <AdminTemplates templates={templates} />}
          {tab === "users" && <AdminUsers users={users} modelUser={modelUser} setModelUser={setModelUser} />}
          {tab === "settings" && <AdminSettings />} */}
        </section>
      )}
    </div>
  );
}
