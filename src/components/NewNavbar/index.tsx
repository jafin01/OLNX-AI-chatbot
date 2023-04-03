import Link from "next/link";
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { FiArrowLeftCircle } from "react-icons/fi";

function NewNavbar() {
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="flex justify-between 2xl:justify-around py-10 px-10">
      <div>
        <Link href="/" className="text-xl font-bold">OLNX</Link>
      </div>
      <div className="flex justify-center gap-20">
          <Link href="/login" className="font-semibold cursor-pointer text-lg hidden md:block lg:block xl:block 2xl:block">Login</Link>
          <Link href="/register" className="font-semibold cursor-pointer text-lg hidden md:block lg:block xl:block 2xl:block">Sign up</Link>
        <h1 className="md:hidden lg:hidden xl:hidden 2xl:hidden text-2xl">
          <FiMenu onClick={handleOpen} />
        </h1>
      </div>
      {isOpen && (
        <div className="absolute w-full h-[10000px]  mt-[-40px] lg:hidden md:hidden xl:hidden 2xl:hidden">
          <div className="bg-black h-[1000px]">
            <div className="">
              <h1 className="text-white pt-5 px-5 flex items-end text-3xl">
                <FiArrowLeftCircle onClick={handleOpen} />
              </h1>
            </div>
            <div className="text-center py-10">
              <Link href='/login' className="text-white py-3 text-2xl">Sign In</Link>
            </div>
            <div className="text-center">
              <Link href='/register' className="text-white text-2xl">Sign Up</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewNavbar;
