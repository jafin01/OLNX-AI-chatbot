/* eslint-disable react-hooks/exhaustive-deps */
import AdminTemplates from "@/components/Admin/Templates";
import { LoadingPage } from "@/components/Loading";
import { loadAdmin } from "@/services/admin/admin.services";
import { useAdminStore } from "@/stores/admin";
import { useQuery } from "@tanstack/react-query";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
// import {
//   Button,
//   Card,
//   Icon,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeaderCell,
//   TableRow,
//   Text,
//   Title,
// } from "@tremor/react";
// import {
//   FiBox,
//   FiEye,
//   FiMessageSquare,
//   FiTrash,
//   FiTrendingUp,
//   FiUser,
// } from "react-icons/fi";

export default function Templates() {
  // const [templates, setTemplates] = useState([]);

  const { templates }: any = useAdminStore();
  
  // const { data: session } = useSession();

  // const { isLoading }: { isLoading: boolean, error: any, data: any} = useQuery({
  //   queryKey: ["fetch-admin"],
  //   queryFn: () => {
  //     return loadAdmin({ token: session?.user?.token || "" });
  //   },
  //   onSuccess: (data) => {
  //     setTemplates(data.templates.data);
  //   }
  // });

  return (
    <div className="px-5 bg-gray-100 h-screen">
      {/* {isLoading ? (
        <LoadingPage />
      ) : ( */}
        <AdminTemplates templates={templates} />
      {/* )} */}
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
