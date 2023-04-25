/* eslint-disable react-hooks/exhaustive-deps */
import AdminTemplates from "@/components/Admin/Templates";
import { LoadingPage } from "@/components/Loading";
import { loadAdmin } from "@/services/admin/admin.services";
import { useQuery } from "@tanstack/react-query";
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
  const [templates, setTemplates] = useState([]);
  // const [loading, setLoading] = useState(false);
  
  const { push } = useRouter();

  const { isLoading, error, data }: { isLoading: boolean, error: any, data: any} = useQuery({
    queryKey: ["fetch-admin"],
    queryFn: loadAdmin,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data) {
      setTemplates(data.templates.data)
    } else if (error) {
      console.log(error);
    }
  }, [ error, data]);

  useEffect(() => {
    if (!window.localStorage.getItem("accessToken")) {
      push("/login");
    }
  }, []);

  return (
    <div className="px-5 bg-gray-100 h-screen">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <AdminTemplates templates={templates} />
      )}
  </div>
  );
}
