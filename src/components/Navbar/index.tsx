import axios from "axios";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiCreditCard,
  FiLogOut,
  FiActivity,
  FiKey,
  FiMessageSquare,
  FiBox,
  FiAlertOctagon,
  FiDollarSign,
} from "react-icons/fi";

export default function Navbar() {
  // const [billingUrl, setBillingUrl] = useState<string | null>(null);
  const [is_admin, setIsAdmin] = useState<boolean>(false);
  const [is_subscribed, setIsSubscribed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  function closeNavbar() {
    setIsOpen(false);
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768 && isOpen) {
        closeNavbar();
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  return (
    <>
      <nav className="py-4 h-16 bg-white border-b border-gray-300 w-full flex justify-between items-center">
        <div className="w-full flex justify-between">
          <div className="w-full flex justify-between font-mono text-lg">
            <Link
              href="/playgrounds"
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-300"
            >
              <FiActivity />
              <span>
                <b className="font-bold">OL</b>NX
              </span>
            </Link>

            <button
              type="button"
              className="md:hidden px-5 text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500"
              onClick={() => setIsOpen(!isOpen)}
            >
              {!isOpen && (
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="menu w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 4.75C2 4.33579 2.33579 4 2.75 4H17.25C17.6642 4 18 4.33579 18 4.75C18 5.16421 17.6642 5.5 17.25 5.5H2.75C2.33579 5.5 2 5.16421 2 4.75ZM2 9.75C2 9.33579 2.33579 9 2.75 9H17.25C17.6642 9 18 9.33579 18 9.75C18 10.1642 17.6642 10.5 17.25 10.5H2.75C2.33579 10.5 2 10.1642 2 9.75ZM2.75 14C2.33579 14 2 14.3358 2 14.75C2 15.1642 2.33579 15.5 2.75 15.5H17.25C17.6642 15.5 18 15.1642 18 14.75C18 14.3358 17.6642 14 17.25 14H2.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {isOpen && (
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className=""
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              )}
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2">
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
                href="/admin/dashboard"
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
              onClick={() => {
                signOut();
              }}
              href={`/logout`}
              className="bg-white hover:bg-gray-300 px-4 py-2 rounded flex gap-2 items-center"
            >
              <FiLogOut />
              <span>Logout</span>
            </Link>
          </div>

          {isOpen && (
            <div className="absolute bg-white h-screen w-full mt-12 items-center gap-2">
              <Link
                href="/playgrounds"
                className="justify-center flex pt-10 pb-5 items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <FiMessageSquare />
                <span>Playgrounds</span>
              </Link>
              <Link
                href="/templates"
                className="justify-center flex py-5 gap-2 items-center"
                onClick={() => setIsOpen(false)}
              >
                <FiBox />
                <span>Templates</span>
              </Link>

              {is_admin ? (
                <Link
                  href="/admin"
                  className="justify-center py-5 flex gap-2 items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <FiKey />
                  <span>Admin</span>
                </Link>
              ) : (
                <></>
              )}
              <Link
                href="/billing"
                className="justify-center p-5 flex gap-2 items-center"
                onClick={() => setIsOpen(false)}
              >
                <FiCreditCard />
                <span>Billing</span>
              </Link>
              <Link
                onClick={() => {
                  setIsOpen(false)
                  signOut();
                }}
                href={`/logout`}
                className="justify-center p-5 flex gap-2 items-center"
              >
                <FiLogOut />
                <span>Logout</span>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {loading ? (
        <></>
      ) : is_subscribed ? (
        <></>
      ) : is_admin ? (
        <></>
      ) : (
        <aside className="bg-amber-500 flex items-center px-6 md:h-14 font-mono font-bold text-white gap-4">
          <FiAlertOctagon size={24} />
          <span className="text-sm md:text-base">
            You are on a free plan, subscribe now to access full features.
          </span>
          <span className="flex-1">&nbsp;</span>
          <span>
            <Link
              href="/billing"
              className="flex items-center gap-2 px-4 py-1 rounded border-2 border-white hover:bg-white hover:text-amber-500"
            >
              <FiDollarSign />
              <span className="text-sm md:text-base">Subscribe Now</span>
            </Link>
          </span>
        </aside>
      )}
    </>
  );
}
