import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiLogOut, FiMessageSquare } from "react-icons/fi";
import { AiOutlineLogin } from "react-icons/ai";
import { GiArchiveRegister } from "react-icons/gi";

function HomeNavbar({ accessToken }: any) {
  const [isOpen, setIsOpen] = useState(false);

  function closeNavbar() {
    setIsOpen(false);
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768 && isOpen) {
        closeNavbar();
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen])

  return (
    <nav
      className="relative z-50 h-24 select-none"
      x-data="{ showMenu: false }"
    >
      <div className="container relative flex flex-wrap items-center justify-between h-24 mx-auto overflow-hidden font-medium border-b border-gray-200 md:overflow-visible lg:justify-center sm:px-4 md:px-2 lg:px-0">
        <div className="flex items-center w-full h-full pr-4 justify-between">
          <div>
            <Link href="/" className="inline-block py-4 md:py-0">
              <span className="p-1 text-xl font-black leading-none text-gray-900">
                OLNX
              </span>
            </Link>
          </div>
          <div>
            <button
              type="button"
              className="flex md:hidden px-5 text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500"
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

            <div className="hidden md:flex ">
              {accessToken ? (
                <>
                  <Link
                    href="/playgrounds"
                    className="justify-center p-5 flex gap-2 items-center w-full px-3 py-2 mr-0 text-gray-700 md:mr-2 lg:mr-3 md:w-auto hover:text-cyan-500"
                  >
                  <FiMessageSquare />
                    Playgrounds
                  </Link>
                  <Link
                    href="/logout"
                    className="justify-center p-5 flex gap-2 items-center w-full px-3 py-2 mr-0 text-gray-700 md:mr-2 lg:mr-3 md:w-auto hover:text-cyan-500"
                  >
                <FiLogOut />
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="w-full px-3 py-2 mr-0 text-gray-700 md:mr-2 lg:mr-3 md:w-auto hover:text-cyan-500"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex items-center w-full px-6 py-3 text-sm font-medium leading-4 text-white bg-indigo-600 md:px-3 md:w-auto md:rounded-full lg:px-5 hover:bg-indigo-500 focus:outline-none md:focus:ring-2 focus:ring-0 focus:ring-offset-2 focus:ring-indigo-600"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute bg-white h-screen w-full mt-12 items-center gap-2">
          {accessToken ? (
            <>
              <Link
                href="/playgrounds"
                className="justify-center p-5 flex gap-2 items-center"
              >
                <FiMessageSquare />
                Playgrounds
              </Link>
              <Link
                href="/logout"
                className="justify-center p-5 flex gap-2 items-center"
              >
                <FiLogOut />
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="mx-auto flex p-5 gap-2 items-center max-w-max hover:text-cyan-500"
              >
                <AiOutlineLogin />
                Sign In
              </Link>
              <Link
                href="/register"
                className="mx-auto p-5 flex gap-2 items-center max-w-max hover:text-cyan-500"
              >
                <GiArchiveRegister />
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default HomeNavbar;
