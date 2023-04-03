import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiCreditCard,
  FiLogOut,
  FiActivity,
  FiKey,
  FiMessageSquare,
  FiBox,
  FiLoader,
  FiAlertOctagon,
  FiDollarSign,
} from "react-icons/fi";

export default function Navbar() {
  // const [billingUrl, setBillingUrl] = useState<string | null>(null);
  const [is_admin, setIsAdmin] = useState<boolean>(false);
  const [is_subscribed, setIsSubscribed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      const res = await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${window.localStorage.getItem(
              "accessToken"
            )}`,
          },
        })
        .then((res) => {
          setIsSubscribed(res.data.subscribed);
          setIsAdmin(res.data.user.is_admin);
        })
        .catch((err) => {
          console.log(err);
        });
      setLoading(false);
    }
    getUser();
  }, []);
  return (
    <>
      <nav className="px-6 py-4 h-16 bg-white border-b border-gray-300 w-full flex justify-between items-center">
        <div className="font-mono text-lg">
          <Link
            href="/playgrounds"
            className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-300"
          >
            <FiActivity />
            <span>
              <b className="font-bold">OL</b>NX
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/playgrounds"
            className="bg-white hover:bg-gray-300 px-4 py-2 rounded flex gap-2 items-center"
          >
            <FiMessageSquare />
            <span>Playgrounds</span>
          </Link>
          <Link
            href="/templates"
            className="bg-white hover:bg-gray-300 px-4 py-2 rounded flex gap-2 items-center"
          >
            <FiBox />
            <span>Templates</span>
          </Link>
          {is_admin ? (
            <Link
              href="/admin"
              className="bg-white hover:bg-gray-300 px-4 py-2 rounded flex gap-2 items-center"
            >
              <FiKey />
              <span>Admin</span>
            </Link>
          ) : (
            <></>
          )}
          <Link
            href="/billing"
            className="bg-white hover:bg-gray-300 px-4 py-2 rounded flex items-center gap-2"
          >
            <FiCreditCard />
            <span>Billing</span>
          </Link>
          <Link
            href={`/logout`}
            className="bg-white hover:bg-gray-300 px-4 py-2 rounded flex gap-2 items-center"
          >
            <FiLogOut />
            <span>Logout</span>
          </Link>
        </div>
      </nav>
      {loading ? (
        <></>
      ) : is_subscribed ? (
        <></>
      ) : is_admin ? (
        <></>
      ) : (
        <aside className="bg-amber-500 h-16 flex items-center px-6 font-mono font-bold text-white gap-4">
          <FiAlertOctagon size={24} />
          <span>
            You are on a free plan, subscribe now to access full features.
          </span>
          <span className="flex-1">&nbsp;</span>
          <span>
            <Link
              href="/billing"
              className="flex items-center gap-2 px-4 py-1 rounded border-2 border-white hover:bg-white hover:text-amber-500"
            >
              <FiDollarSign />
              <span>Subscribe Now</span>
            </Link>
          </span>
        </aside>
      )}
    </>
  );
}
