import { LoadingPage } from "@/components/Loading";
import Navbar from "@/components/Navbar";
import PlaygroundContent from "@/components/Playground/Content";
import PlaygroundNavbar from "@/components/Playground/Navbar";
import { useConversationStore } from "@/stores/conversation";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiClock, FiMessageSquare, FiPlusCircle } from "react-icons/fi";

export default function Playgrounds() {
  //   const [accessToken, setAccessToken] = useState<string | null>(null);
  const { push } = useRouter();

  const [playgrounds, setPlaygrounds] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const colors = [
    "bg-teal-700",
    "bg-rose-700",
    "bg-amber-700",
    "bg-cyan-700",
    "bg-indigo-700",
    "bg-purple-700",
    "bg-pink-700",
    "bg-yellow-700",
    "bg-green-700",
    "bg-blue-700",
    "bg-red-700",
    "bg-gray-700",
  ];

  useEffect(() => {
    if (!window.localStorage.getItem("accessToken")) {
      push("/login");
    }
    async function loadPlaygrounds() {
      setLoading(true);
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/conversation`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "accessToken"
            )}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          setPlaygrounds(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      setLoading(false);
    }
    loadPlaygrounds();
  }, []);
  return (
    <>
      <Navbar />
      {loading ? (
        <LoadingPage />
      ) : (
        <section
          className="p-6 bg-gray-100"
          style={{ minHeight: "calc(100vh - 4rem)" }}
        >
          <h1 className="mb-6 text-2xl font-mono text-gray-500 flex items-center gap-2 uppercase">
            <FiMessageSquare />
            <span>Playgrounds</span>
          </h1>
          <main className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Link
              href="/playgrounds/new"
              className="rounded overflow-hidden border border-gray-300 h-32 text-gray-500"
            >
              <div className="text-xl flex flex-col items-center justify-center h-full gap-4">
                <span className="text-4xl">
                  <FiPlusCircle />
                </span>
                <span>New Playground</span>
              </div>
            </Link>
            {playgrounds.map((playground) => {
              return (
                <Link
                  key={playground.id}
                  href={`/playgrounds/${playground.id}`}
                  className="rounded overflow-hidden border border-gray-300 bg-white shadow-none h-32 flex flex-col transition-all duration-150 hover:shadow-xl cursor-pointer"
                >
                  <div className="p-6 flex-1 w-full flex items-center gap-2">
                    <FiMessageSquare />
                    <span className="flex-1 font-mono truncate">
                      {playground.name}
                    </span>
                  </div>
                  <div
                    className={`h-14 w-full ${
                      colors[playground.id % colors.length]
                    } p-4 flex items-center justify-between text-white font-mono`}
                  >
                    <FiClock />
                    <span>
                      {new Date(playground.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              );
            })}
          </main>
        </section>
      )}
    </>
  );
}
