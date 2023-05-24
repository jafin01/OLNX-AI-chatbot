/* eslint-disable @next/next/no-img-element */
import HomeNavbar from "@/components/HomeNavbar";
import Link from "next/link";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Footer from "@/components/Footer";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if(session) {
      console.log(session, status)
    }
  }, [session, status])
  
  return (
    <>
      <section
        className="w-full px-6 pb-12 antialiased bg-white"
        data-tails-scripts="//unpkg.com/alpinejs"
      >
        <div className="mx-auto max-w-7xl">
          <HomeNavbar session={session} />

          <div className="container max-w-lg px-4 py-20 mx-auto mt-px text-left md:py-32 md:max-w-none md:text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-left text-gray-900 pb-3 md:pb-0 md:text-center md:text-6xl lg:text-7xl">
              <span className="inline md:block">Start Crafting Your</span>
              <span className="relative mt-2 text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500 md:inline-block">
                Next Great AI
              </span>
            </h1>
            <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg md:text-center lg:text-lg">
              Simplifying the creation of chat bots and so much more!
            </div>
            <div className="flex flex-col items-center mt-12 text-center">
              <span className="relative inline-flex w-full md:w-auto">
                <Link
                  href="/register"
                  type="button"
                  className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-bold leading-6 text-white bg-indigo-600 border border-transparent rounded-full md:w-auto hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                >
                  Get Started Now
                </Link>
                <span className="absolute top-0 right-0 px-2 py-1 -mt-3 -mr-6 text-xs font-medium leading-tight text-white bg-green-400 rounded-full">
                  only $20/mo
                </span>
              </span>
              {!session && (
                <Link href="/login" className="mt-3 text-sm text-indigo-500">
                  Already have an account?
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="h-auto bg-white">
        <div className="px-10 py-24 mx-auto max-w-full bg-gray-100">
          <div className="w-full mx-auto text-left md:text-center">
            <h1 className="mb-6 text-4xl font-extrabold leading-none max-w-5xl mx-auto tracking-normal text-gray-900 md:text-6xl lg:text-7xl md:tracking-tight">
              The&nbsp;
              <span className="w-full text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 lg:inline">
                Number One Source
              </span>
              &nbsp;for&nbsp;
              <br className="lg:block hidden" />
              all your AI Chat-bot needs.
            </h1>
            <p className="px-0 mb-6 text-lg text-gray-600 md:text-xl lg:px-24">
              Say hello to the number one source for all your AI Chat-bot needs.
              Have 2 bots conversation with each other to help tell your story.
            </p>
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center py-10 text-white bg-white sm:py-16 md:py-24 lg:py-32">
        <div className="relative max-w-3xl px-10 text-center text-white auto lg:px-0">
          <div className="flex flex-col w-full md:flex-row">
            <div className="flex justify-between">
              <h1 className="relative flex flex-col text-4xl md:text-6xl lg:text-6xl xl:text-6xl 2xl:text-6xl font-extrabold text-left text-black">
                Crafting
                <span className="">Powerful</span>
                <span className="">Experiences</span>
              </h1>
            </div>
            <div className="relative top-0 right-0 h-64 mt-12 md:-mt-16 md:absolute md:h-96">
              <img
                src="https://cdn.devdojo.com/images/december2020/designs3d.png"
                className="object-cover mt-3 mr-5 h-80 lg:h-96 tails-relative"
                alt="Designs 3D"
              />
            </div>
          </div>
          <div className="my-16 border-b border-gray-300 lg:my-24"></div>
          <h2 className="text-left text-gray-500 xl:text-xl">
            Building extremely efficient chat-bots. We&apos;ve unlocked the
            secret to converting your normal AI conversations into some more
            magical!
            <br />
          </h2>
        </div>
      </section>
      <section className="py-20 bg-gray-100">
        <div className="px-6 mx-auto text-center max-w-7xl md:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl xl:text-6xl">
            The New Standard for{" "}
            <span className="w-full text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 lg:inline">
              AI
            </span>{" "}
            Conversations
          </h2>
          <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Use our award-winning tools to help you maximize your profits.
            We&apos;ve uncovered the correct recipe for converting AI chats into
            magic.
          </p>
          <div className="flex justify-center mt-8 space-x-3">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow hover:bg-indigo-700"
              data-primary="indigo-600"
              data-rounded="rounded-md"
            >
              Sign Up Today
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200"
              data-primary="indigo-600"
              data-rounded="rounded-md"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
      <section className="box-border py-8 leading-7 text-gray-900 bg-white border-0 border-gray-200 border-solid sm:py-12 md:py-16 lg:py-24">
        <div className="box-border max-w-6xl px-4 pb-12 mx-auto border-solid sm:px-6 md:px-6 lg:px-4">
          <div className="flex flex-col items-center leading-7 text-center text-gray-900">
            <h2 className="box-border m-0 text-3xl font-semibold leading-tight tracking-tight text-black border-solid sm:text-4xl md:text-5xl">
              Pricing Options
            </h2>
            <p className="box-border mt-4 text-2xl leading-normal text-gray-900 border-solid">
              We&apos;ve got a plan for companies of any size
            </p>
          </div>
          <div
            className="grid max-w-md mx-auto mt-6 overflow-hidden leading-7 text-gray-900 border border-b-4 border-blue-600 rounded-xl md:max-w-lg lg:max-w-none sm:mt-10 lg:grid-cols-3"
            data-primary="blue-600"
            data-rounded="rounded-xl"
            data-rounded-max="rounded-full"
          >
            <div className="box-border px-4 py-8 mb-6 text-center bg-white border-solid lg:mb-0 sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-10">
              <h3 className="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-solid sm:text-3xl md:text-4xl">
                Free
              </h3>
              <p className="mt-3 leading-7 text-gray-900 border-0 border-solid">
                The basic plan is a good fit for smaller teams and startups
              </p>
              <div className="flex items-center justify-center mt-6 leading-7 text-gray-900 border-0 border-solid sm:mt-8">
                <p className="box-border m-0 text-6xl font-semibold leading-normal text-center border-0 border-gray-200">
                  $0
                </p>
                <p className="box-border my-0 ml-4 mr-0 text-xs text-left border-0 border-gray-200">
                  <span className="block">per month</span>
                </p>
              </div>
              <Link
                href="/register"
                className="inline-flex items-center justify-center w-full py-3 mt-6 font-sans text-sm leading-none text-center text-blue-600 no-underline bg-transparent border border-b-2 border-blue-600 rounded-md cursor-pointer hover:bg-blue-600 hover:border-blue-600 hover:text-white sm:text-base sm:mt-8 md:text-lg"
              >
                Get Started
              </Link>
            </div>
            <div className="box-border px-4 py-8 mb-6 text-center bg-gray-100 border border-gray-300 border-solid lg:mb-0 sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-10">
              <h3 className="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-solid sm:text-3xl md:text-4xl">
                Plus
              </h3>
              <p className="mt-3 leading-7 text-gray-900 border-0 border-solid">
                The plus plan is a good fit for medium-size to larger companies
              </p>
              <div className="flex items-center justify-center mt-6 leading-7 text-gray-900 border-0 border-solid sm:mt-8">
                <p className="box-border m-0 text-6xl font-semibold leading-normal text-center border-0 border-gray-200">
                  $20
                </p>
                <p className="box-border my-0 ml-4 mr-0 text-xs text-left border-0 border-gray-200">
                  <span className="block">per month</span>
                </p>
              </div>
              <Link
                href="/register"
                className="inline-flex items-center justify-center w-full py-3 mt-6 font-sans text-sm leading-none text-center text-white no-underline bg-blue-600 border-b-4 border-blue-700 rounded cursor-pointer hover:text-white sm:text-base sm:mt-8 md:text-lg"
              >
                Get Started
              </Link>
            </div>
            <div className="box-border px-4 py-8 text-center bg-white border-solid sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-10">
              <h3 className="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-solid sm:text-3xl md:text-4xl">
                Enterprise
              </h3>
              <p className="mt-3 leading-7 text-gray-900 border-0 border-solid">
                The pro plan is a good fit for larger and enterprise companies.
              </p>
              <div className="flex items-center justify-center mt-6 leading-7 text-gray-900 border-0 border-solid sm:mt-8">
                <p className="box-border m-0 font-semibold leading-normal text-center border-0 border-gray-200 text-5xl mb-5">
                  Contact Now
                  <br />
                </p>
              </div>
              <a
                href="mailto:admin@olnx.com"
                target="_blank"
                className="inline-flex items-center justify-center w-full py-3 mt-6 font-sans text-sm leading-none text-center text-blue-600 no-underline bg-transparent border border-b-2 border-blue-600 rounded cursor-pointer hover:bg-blue-600 hover:border-blue-600 hover:text-white sm:text-base sm:mt-8 md:text-lg"
              >
                Enquire Now
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="text-gray-700 bg-white body-font">
        <Footer />
      </section>
    </>
  );
}



