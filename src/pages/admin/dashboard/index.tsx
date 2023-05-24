/* eslint-disable react-hooks/exhaustive-deps */
import AdminHome from "@/components/Admin/Home";
import { useAdminStore } from "@/stores/admin";
import { getSession } from "next-auth/react";

export default function Dashboard() {
  const { playgroundsCount, templatesCount, usersCount }: any = useAdminStore();

  return (
    <div className="bg-gray-100 px-5 min-h-screen">
        <AdminHome
          playgrounds={playgroundsCount}
          templates={templatesCount}
          users={usersCount}
        />
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