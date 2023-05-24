/* eslint-disable react-hooks/exhaustive-deps */
import { LoadingPage } from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { loadAdmin } from "@/services/admin/admin.services";
import { useAdminStore } from "@/stores/admin";
import { useQuery } from "@tanstack/react-query";
import { TabList, Tab } from "@tremor/react";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [tab, setTab] = useState<string>("dashboard");
  const [isSmallerScreen, setIsSmallerScreen] = useState<boolean>(true);

  const { data: session } = useSession();

  const { isLoading } = useQuery({
    queryKey: ["fetch-admin"],
    queryFn: () => {
      return loadAdmin({ token: session?.user?.token || "" });
    },
    onSuccess: (data: any) => {
      useAdminStore.setState({
        playgrounds: data.playgrounds.data,
        playgroundsCount: data.playgrounds_count,
        templates: data.templates.data,
        templatesCount: data.templates_count,
        users: data.users.data,
        usersCount: data.users_count,
      });
    },
  });
  
  useEffect(() => {
    setTab(route?.split("/")[2] || "dashboard");
  }, [route]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 375) {
        setIsSmallerScreen(true);
      } else {
        setIsSmallerScreen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="">
      <Navbar />
      {loading ? (
        <LoadingPage />
      ) : (
        <section
          className="p-6 bg-gray-100"
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
            }}
            className="my-6"
          >
            <Tab value="dashboard" text={isSmallerScreen ? "Dashboard" : ""} icon={FiHome} />
            <Tab value="playgrounds" text={isSmallerScreen ? "Playgrounds" : ""} icon={FiActivity} />
            <Tab value="templates" text={isSmallerScreen ? "Templates" : ""} icon={FiBox} />
            <Tab value="users" text={isSmallerScreen ? "Users" : ""} icon={FiUsers} />
            {/* <Tab value="settings" text={isSmallerScreen ? "Settings" : ""} icon={FiSettings} /> */}
          </TabList>
        </section>
      )}
    </div>
  );
}
