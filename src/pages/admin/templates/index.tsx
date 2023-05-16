/* eslint-disable react-hooks/exhaustive-deps */
import AdminTemplates from "@/components/Admin/Templates";
import { useAdminStore } from "@/stores/admin";
import { getSession } from "next-auth/react";

export default function Templates() {
  const { templates }: any = useAdminStore();

  return (
    <div className="px-5 bg-gray-100 h-screen">
      <AdminTemplates templates={templates} />
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
