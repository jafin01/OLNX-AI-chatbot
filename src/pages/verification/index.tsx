/* eslint-disable @next/next/no-img-element */
import Footer from "@/components/Footer";
import NewNavbar from "@/components/HomeNavbar";
import { Button } from "@tremor/react";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FiArrowRight, FiLogIn, FiPlay } from "react-icons/fi";

export default function Home() {
  let [accessToken, setAccessToken] = useState<string | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(30);

  useEffect(() => {
    if (window.localStorage.getItem("accessToken")) {
      setAccessToken(window.localStorage.getItem("accessToken"));
    }
  }, []);

  useEffect(() => {
    seconds > 0 &&
      buttonDisabled &&
      setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);

    if (seconds === 0 && buttonDisabled) {
      setSeconds(30);
      setButtonDisabled(false);
    }
  }, [seconds, buttonDisabled]);

  function handleClick() {
    console.log("clicked");
    setButtonDisabled(true);
  }

  return (
    <>
      <section
        className="w-full px-6 pb-12 antialiased bg-white"
        data-tails-scripts="//unpkg.com/alpinejs"
      >
        <div className="mx-auto max-w-7xl">
          <nav
            className="relative z-50 h-24 select-none"
            x-data="{ showMenu: false }"
          >
            <div className="container relative flex flex-wrap items-center justify-between h-24 mx-auto overflow-hidden font-medium border-b border-gray-200 md:overflow-visible lg:justify-center sm:px-4 md:px-2 lg:px-0">
              <div className="flex items-center justify-start w-1/4 h-full pr-4">
                <Link href="/" className="inline-block py-4 md:py-0">
                  <span className="p-1 text-xl font-black leading-none text-gray-900">
                    OLNX
                  </span>
                </Link>
              </div>
              <div
                className="top-0 left-0 items-start w-full h-full p-4 text-sm bg-gray-900 bg-opacity-50 md:items-center md:w-3/4 lg:text-base md:bg-transparent md:p-0 md:relative md:flex hidden"
                // classX="{&apos;flex fixed&apos;: showMenu, &apos;hidden&apos;: !showMenu }"
              >
                <div className="flex-col w-full h-auto overflow-hidden bg-white rounded-lg md:bg-transparent md:overflow-visible md:rounded-none md:relative md:flex md:flex-row">
                  <Link
                    href="/"
                    className="items-center block w-auto h-16 px-6 text-xl font-black leading-none text-gray-900 md:hidden"
                  >
                    OLNX
                  </Link>
                  <div className="flex-1"></div>
                  <div className="flex flex-col items-start justify-end w-full pt-4 md:items-center md:w-1/3 md:flex-row md:py-0">
                    <Link
                      href="/register"
                      className="inline-flex items-center w-full px-6 py-3 text-sm font-medium leading-4 text-white bg-indigo-600 md:px-3 md:w-auto md:rounded-full lg:px-5 hover:bg-indigo-500 focus:outline-none md:focus:ring-2 focus:ring-0 focus:ring-offset-2 focus:ring-indigo-600"
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              </div>
              <div
                onClick={() => {
                  //"showMenu = !showMenu"
                }}
                className="absolute right-0 flex flex-col items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer md:hidden hover:bg-gray-100"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  x-show="!showMenu"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" className=""></path>
                </svg>
                <svg
                  className="w-6 h-6 text-gray-700"
                  x-show="showMenu"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ display: "none" }}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
            </div>
          </nav>
          <div className="container max-w-lg px-4 py-32 mx-auto mt-px text-left md:max-w-none md:text-center">
            <h1 className="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 md:text-center sm:leading-none md:text-6xl lg:text-7xl">
              <span className="inline md:block">Hey, Verify Your</span>
              <span className="relative mt-2 text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500 md:inline-block">
                Email
              </span>
            </h1>
            <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg md:text-center lg:text-lg">
              Verify your email address to get access to the platform
            </div>
            <div className="flex flex-col items-center mt-12 text-center">
              <span className="relative inline-flex w-full md:w-auto">
                <button
                  type="button"
                  disabled={buttonDisabled}
                  className={`inline-flex items-center justify-center w-full px-8 py-4 text-base font-bold leading-6 text-white border border-transparent rounded-full md:w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    buttonDisabled
                      ? "bg-gray-400 text-gray-800"
                      : "focus:ring-indigo-600  hover:bg-indigo-500 bg-indigo-600"
                  }`}
                  onClick={handleClick}
                >
                  Verify Email Now
                </button>
              </span>
              {buttonDisabled && (
                <p className="mt-3 text-sm text-indigo-500">
                  {`Resent verification email in ${seconds} seconds`}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
