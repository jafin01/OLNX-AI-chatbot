/* eslint-disable react-hooks/exhaustive-deps */
import AdminHome from "@/components/Admin/Home";
import { LoadingPage } from "@/components/Loading";
import { loadAdmin } from "@/services/admin/admin.services";
import { useQuery } from "@tanstack/react-query";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
// import { Grid, Card, Flex, Icon, Metric, Text, Button } from "@tremor/react";
// import { FiActivity, FiBox, FiMessageSquare, FiUser } from "react-icons/fi";

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

  const { data: session } = useSession();

  const { isLoading } = useQuery({
      queryKey: ["fetch-admin"],
      queryFn: () => {
        return loadAdmin({ token: session?.user?.token || "" });
      },
      // keepPreviousData: true,p
      // cacheTime: 1000 * 60 * 5,
      // staleTime: 1000 * 60 * 5,
      onSuccess: (data) => {
        console.log('hi')
        setPlaygroundsCount(data.playgrounds_count);
        setTemplatesCount(data.templates_count);
        setUsersCount(data.users_count);
      },
    });

  return (
    <div className="bg-gray-100 h-screen px-5">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <AdminHome
          playgrounds={playgroundsCount}
          templates={templatesCount}
          users={usersCount}
        />
      )}
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