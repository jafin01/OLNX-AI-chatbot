import AdminTemplates from "@/components/Admin/Templates";
import AdminUsers from "@/components/Admin/Users";
import { LoadingPage } from "@/components/Loading";
import {
  Button,
  Card,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FiBox,
  FiEye,
  FiMessageSquare,
  FiTrash,
  FiTrendingUp,
  FiUser,
} from "react-icons/fi";

export default function Templates() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const { push } = useRouter();

  async function loadAdmin() {
    setLoading(true);
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
          Accept: "application/json",
        },
      })
      .then((res: any) => {
        setUsers(res.data.users.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
    setLoading(false);
  }

  useEffect(() => {
    if (!window.localStorage.getItem("accessToken")) {
      push("/login");
    }
    // push(route)
    loadAdmin();
  }, []);

  return (
    <div className="px-5 bg-gray-100 h-screen">
      {loading ? (
        <LoadingPage />
      ) : (
        <AdminUsers users={users} />
      )}
  </div>
  );
}
