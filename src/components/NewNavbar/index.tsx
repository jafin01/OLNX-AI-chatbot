import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FiActivity,
  FiLogIn,
  FiLogOut,
  FiMenu,
  FiMessageSquare,
  FiPlay,
} from "react-icons/fi";
import { FiArrowLeftCircle } from "react-icons/fi";

function NewNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  let [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (window.localStorage.getItem("accessToken")) {
      setAccessToken(window.localStorage.getItem("accessToken"));
    }
  }, []);

  function handleOpen() {
    setIsOpen(!isOpen);
    console.log("handled successfully");
  }

  //   if (isOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }

  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white shadow-lg z-50">
      <Link href="/" className="font-bold flex gap-2 items-center">
        <FiActivity />
        <span>OLNX</span>
      </Link>

      <div className="flex justify-center">
        {!accessToken ? (
          <>
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 active:bg-gray-300"
            >
              <FiLogIn />
              <span>Login</span>
            </Link>
            <Link
              href="/register"
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 active:bg-gray-300"
            >
              <FiPlay />
              <span>SignUp</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/playgrounds"
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 active:bg-gray-300"
            >
              <FiMessageSquare />
              <span>Playgrounds</span>
            </Link>
            <Link
              href="/logout"
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 active:bg-gray-300"
            >
              <FiLogOut />
              <span>Logout</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NewNavbar;
