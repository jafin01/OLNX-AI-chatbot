/* eslint-disable @next/next/no-img-element */
import Footer from "@/components/Footer";
import LottieAnimation from "@/components/LottiAnimation";
import NewNavbar from "@/components/NewNavbar";
import React from "react";

function index() {
  return (
    <div>
      <div className="bg-cred-light">
        <div className="">
            <NewNavbar />
        </div>
        <div className="md:flex md:justify-center md:px-20 2xl:px-[20%] 2xl:gap-10">
          <div className="text-white font-semibold text-3xl lg:text-5xl 2xl:text-7xl w-[60%] m-auto pb-10">
            <h1 className="">Sales Process Design & Methodology</h1>
            <div className="md:py-14 lg:py-14, xl:py-14 2xl:py-14 lg:text-[36px]">
              <button className="text-md font-normal border border-cred-dark bg-blue-300 px-3 mr-2 py-2 mt-5">
                Sign In
              </button>
              <button className="text-md font-normal border border-cred-dark bg-gray-500 px-3 py-2 my-5">
                Sign Up
              </button>
            </div>
          </div>
          <div className="w-[80%] md:w-[50%] 2xl:w-[45%] m-auto pb-10">
            <LottieAnimation />
          </div>
        </div>
      </div>
      <div className="mt-10 md:flex md:justify-center md:px-20 2xl:w-[70%] 2xl:m-auto 2xl:py-20 2xl:px-40">
        <div className="border bg-gray-200 text-center w-[65%] md:w-[75%] lg:w-[45%] 2xl:w-[30%] m-auto py-10 md:py-20 lg:py-14 px-1">
          <h1 className="text-3xl md:text-5xl lg:text-5xl 2xl:text-4xl font-semibold">
            we collaborte with brands and agencies to create memorable
            experiences.
          </h1>
        </div>
        <div className="md:w-[80%]">
          <div className="lg:flex">
            <div className="bg-cgreen-light w-[120px] p-5 mt-6 ml-[18%]">
              <h1 className="text-center font-black text-6xl text-white">01</h1>
            </div>
            <div className="w-[65%] m-auto pt-5 lg:pt-0 pb-14 lg:pb-0 lg:flex 2xl:w-[50%] items-center">
              <p className="md:text-lg lg:ml-2 2xl:-ml-10">
                Sample text. Click to select the text box. Click again or double
                click to start editing the text.
              </p>
            </div>
          </div>
          <div className="w-[65%] m-auto">
            <p className="font-bold md:text-lg lg:mt-10">
              The principal reason we continue to adapt and evolve our business
              model is to ensure that we are meeting our customers expectations.
              One example of this has been to use modern technology and the
              introduction of the real time tracking our teams using GPS.
            </p>
          </div>
          <div className="md:flex-none lg:flex lg:flex-row-reverse lg:mt-10">
            <div className="w-[65%] m-auto pt-14 lg:pt-4 lg:gap-5 lg:flex items-center 2xl:w-[50%]">
              <p className="md:text-lg lg:ml-2 2xl:-ml-10">
                Sample text. Click to select the text box. Click again or double
                click to start editing the text.
              </p>
            </div>
            <div className="bg-cgreen-light w-[120px] p-5 mt-6 ml-[18%]">
              <h1 className="text-center font-black text-6xl text-white">02</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-cred-light mt-14">
        <div className="w-[65%] m-auto py-14 md:flex md:justify-between 2xl:justify-center 2xl:items-center md:gap-20 2xl:gap-32 2xl:py-20">
          <div className="md:w-[80%] 2xl:w-[40%]">
            <div>
              <h1 className="font-bold text-3xl md:text-4xl pb-5 2xl:text-5xl">
                one.
              </h1>
              <p className="md:text-lg 2xl:text-xl">
                Nec feugiat nisl pretium fusce id. Justo laoreet sit amet cursus
                sit amet. Porta non pulvinar neque laoreet suspendisse interdum
                consectetur libero.
              </p>
            </div>
            <div className="pt-10">
              <h1 className="font-bold text-3xl pb-5 md:text-4xl 2xl:text-5xl">
                two.
              </h1>
              <p className="md:text-lg 2xl:text-xl">
                Amet luctus venenatis lectus magna fringilla urna porttitor
                rhoncus dolor. A lacus vestibulum sed arcu non. Dolor magna eget
                est lorem ipsum dolor sit amet consectetur. Mauris pellentesque
                pulvinar pellentesque habitant morbi tristique senectus.
              </p>
            </div>
          </div>
          <div className="pt-14 md:pt-10 md:w-[80%] lg:pt-0 2xl:w-[30%] 2xl:h-[600px]">
            <img
              className="w-[100%] h-[100%]"
              src="../images/pexels-photo.jpeg"
              alt="feather"
            />
          </div>
        </div>
      </div>
      <div className="mt-20 lg:flex justify-center lg:px-20 lg:mb-10 2xl:w-[65%] 2xl:m-auto 2xl:py-40">
        <div className="">
          <div className="md:flex md:justify-center lg:gap-5 md:px-28 lg:px-0 lg:pl-20 lg:pr-5">
            <div className="w-[65%] md:w-[45%] lg:w-[65%] m-auto">
              <h1 className="font-bold text-4xl md:text-5xl">Gallery</h1>
              <p className="pt-5 pb-10 md:text-lg">
                Sample text. Click to select the text box. Click again or double
                click to start editing the text.
              </p>
            </div>
            <div className="w-[65%] md:w-[45%] lg:w-[65%] h-[300px] m-auto">
              <img
                className="w-[100%] h-[100%]"
                src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTqt-u-5LXDTN9ZWZ5jdho7KRLVHLiA1v0DYOAZ0i3Kx2n5Y6rM"
                alt=""
              />
            </div>
          </div>
          <div className="w-[65%] md:w-[75%] lg:w-[93%] m-auto pt-4">
            <img
              src="https://lh3.googleusercontent.com/8P55VXaz5HXvCeTw7H_W0tawQooMKvJ-NmVosJOfZiOOVTOc6y2kDdtPWDIanbNXLlYmIljOlsOugGPRK1cf5KkBWwduoJJJrexVq6I7"
              alt=""
            />
          </div>
        </div>
        <div className="w-[65%] md:w-[75%] m-auto h-[500px] md:h-[800px] lg:h-[610px] 2xl:h-[650px] py-4 lg:py-0">
          <img
            className="w-[100%] h-[100%]"
            src="https://lh3.googleusercontent.com/teKdjq06kZ12VT0dp_y3WCbaIhxal9XDASu9tmbw1AVg7mxS3Kxmr4tNIEurv03kOu_evmowcbZBOt39n4htWxj-1AhqIXeweyabIrwJPg"
            alt=""
          />
        </div>
      </div>
      <div className="mt-20 bg-cred-light py-20 lg:w-[80%] 2xl:w-[100%] lg:m-auto">
        <div className="w-[65%] 2xl:w-[40%] m-auto py-10 md:py-16 px-2 md:px-5 bg-white">
          <h1 className="text-2xl font-bold md:text-3xl">
            We`ve seen a lot of efficiency in our workflow processes the way
            subs work and the way designers work with templates.
          </h1>
        </div>
        <p className="text-center text-white text-lg font-bold pt-5">
          -James Hawkes, General Manager
        </p>
        <p className="text-center text-white text-lg font-bold">Operations -</p>
      </div>
      <div className="mt-20">
        <div className="w-[65%] md:w-[80%] m-auto 2xl:text-center text-center">
          <div>
            <h1 className="font-bold text-3xl md:px-10">
              Responsiove Pricing Table
            </h1>
            <p className="pt-4 pb-8 md:px-10">
              Sample text. Click to select the text box. Click again or double
              click to start editing t
            </p>
          </div>
          <div className="2xl:flex 2xl:justify-center 2xl:w-[70%] 2xl:m-auto 2xl:gap-10 2xl:py-10">
            <div className="md:flex md:gap-10 justify-center">
              <div className="border">
                <div className="bg-cred-light py-10 md:px-24 text-center">
                  <p className="font-bold uppercase text-3xl">basic</p>
                  <p className="font-bold text-3xl pt-5">$ 30</p>
                </div>
                <div className="text-center py-5 bg-gray-100">
                  <p className="py-5">1 full user</p>
                  <p className="pb-5">1,000 Email Previews</p>
                  <p className="pb-5">5 contacts per client</p>
                  <p>5 coffee cups</p>
                  <div className="flex justify-center pt-10 pb-5">
                    <button className="border uppercase px-5 text-lg py-1 bg-cred-light hover:bg-cred-dark">
                      buy now
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-10 md:mt-0 border">
                <div className="bg-cred-light py-10 px-5 md:px-16 text-center">
                  <p className="font-bold uppercase text-3xl">standard</p>
                  <p className="font-bold text-3xl pt-5">$ 60</p>
                </div>
                <div className="text-center py-5">
                  <p className="py-5">10 full user</p>
                  <p className="pb-5">2,000 Email Previews</p>
                  <p className="pb-5">10 contacts per client</p>
                  <p>10 coffee cups</p>
                  <div className="flex justify-center pt-10 pb-5">
                    <button className="border uppercase px-5 text-lg py-1 bg-cred-light hover:bg-cred-dark">
                      buy now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-5 2xl:my-0">
              <img
                className="w-[100%] md:w-[60%] lg:h-[500px] lg:w-[50%] 2xl:w-[100%] 2xl:h-[490px] md:m-auto"
                src="https://images01.nicepage.com/a1389d7bc73adea1e1c1fb7e/3bd73aa7b5ae57bab1b9e412/pexels-photo-3331837.jpeg"
                alt="image"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-cred-light py-20 lg:w-[80%] 2xl:w-full lg:m-auto">
        <div className="w-[65%] md:w-[80%] m-auto md:flex justify-between 2xl:justify-center 2xl:gap-32">
          <div className="w-[100%] md:w-[50%] 2xl:w-[30%] 2xl:h-[600px]">
            <img
              className="w-[100%] h-[100%]"
              src="https://images01.nicepage.com/a1389d7bc73adea1e1c1fb7e/125ac1f553655a7ea12fdc91/pexels-photo-5803334.jpeg"
              alt=""
            />
          </div>
          <div className="md:py-10">
            <div className="py-10">
              <h1 className="font-bold text-3xl">Call us</h1>
              <p className="pt-3">+91 9234786567</p>
              <p>+91 7676768978</p>
            </div>
            <div>
              <h1 className="font-bold text-3xl">Location</h1>
              <p className="pt-3">121 Rock Sreet, 21 Avenue,</p>
              <p>New York, NY 92103-9000</p>
            </div>
            <div className="py-10">
              <h1 className="font-bold text-3xl">Our top services</h1>
              <div className="pt-3">
                <p className="font-bold">Local Trasfers</p>
                <p className="font-bold">Airport Transfers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}

export default index;
