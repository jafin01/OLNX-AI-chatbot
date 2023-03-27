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
} from "react-icons/fi";

export default function Navbar() {
  const [billingUrl, setBillingUrl] = useState<string | null>(null);
  const [is_admin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    async function getBillingUrl() {
      const res = await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/billing/url`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${window.localStorage.getItem(
              "accessToken"
            )}`,
          },
        })
        .then((res) => {
          setBillingUrl(res.data.url.replace(/\\\//g, "/"));
          setIsAdmin(res.data.user.is_admin);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getBillingUrl();
  }, []);
  return (
    <nav className="px-6 py-4 h-16 bg-white border-b border-gray-300 w-full flex justify-between items-center">
      <div className="font-mono text-lg">
        <Link
          href="/"
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
        {is_admin && (
          <Link
            href="/admin"
            className="bg-white hover:bg-gray-300 px-4 py-2 rounded flex gap-2 items-center"
          >
            <FiKey />
            <span>Admin</span>
          </Link>
        )}
        {/* {billingUrl ? (
          <a
            href={billingUrl}
            className="bg-white hover:bg-gray-300 px-4 py-2 rounded flex items-center gap-2"
          >
            <FiCreditCard />
            <span>Billing</span>
          </a>
        ) : (
          <div className="text-gray-300 px-4 py-2 rounded flex items-center gap-2 cursor-pointer">
            <FiLoader />
            <span>Billing</span>
          </div>
        )} */}
        <Link
          href="/logout"
          className="bg-white hover:bg-gray-300 px-4 py-2 rounded flex gap-2 items-center"
        >
          <FiLogOut />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
}
