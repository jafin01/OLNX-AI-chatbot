import React, { useEffect, useState } from "react";
import axios from "axios";
import notify from "react-hot-toast";
import Lottie from "react-lottie";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import animationData from "../../../public/images/login_lottie.json";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaLock,
  FaGithub,
  FaGoogle,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiLoader } from "react-icons/fi";
import { authorizeUser } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required").min(6),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [abc, setIsFetching] = useState<boolean>(false);
  const [userData, setUserData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );

  const { push } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {}, [push]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["Authorization"],
    queryFn: () =>
      authorizeUser({ email: userData.email, password: userData.password }),
    enabled: abc,
    retry: false,
  });

  useEffect(() => {
    if (window.localStorage.getItem("accessToken")) {
      push("/playgrounds");
    } else if (!window.localStorage.getItem("accessToken")) {
      push("/login");
    }else if(error){
        console.log(error);
    } else if (data) {
        console.log(data);
        push("/");
        // push("/playgrounds");
    }
  }, [error, data, isLoading, push])

  async function submitHandler(values: any) {
    setUserData({
      email: values.email,
      password: values.password,
    });
    setLoading(true);
    setIsFetching(true);
    const toastLoadingId = notify.loading("Logging in...");
    try {
      const response: any = await authorizeUser({
        email: values.email,
        password: values.password,
      });
      window.localStorage.setItem("accessToken", response.token);
      notify.dismiss(toastLoadingId);
      notify.success("Logged in successfully");
      return response;
    } catch (error) {
      notify.dismiss(toastLoadingId);
      notify.error("Invalid Credentials");
      return error;
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <main className="w-full h-screen bg-gray-100 flex">
      <aside className="h-full w-full hidden pt-36 lg:block">
        <Lottie options={defaultOptions} />
      </aside>
      <section className="w-full flex justify-between flex-col h-full z-50">
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
          <div className="w-full max-w-md">
            <h1 className="text-center text-5xl font-extrabold leading-10 tracking-tight text-gray-900 md:text-center sm:leading-none md:text-6xl lg:text-7xl">
              <span className="inline md:block">
                <span className="relative text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500">
                  Log
                </span>
                in
              </span>
            </h1>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={(values) => {
                submitHandler(values);
              }}
            >
              {({ errors, touched }) => (
                <Form className="px-8 pt-6 pb-8 mb-3">
                  <div className="group w-full mb-6">
                    <label
                      htmlFor="email"
                      className="text-sm mb-2 font-bold inline-block w-full text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                    >
                      Email
                    </label>
                    <div className="relative flex items-center ">
                      <Field
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className={`peer relative h-10 w-full outline-none rounded-md bg-gray-50 pl-10 pr-4 font-thin drop-shadow-sm transition-all duration-200 ease-in-out focus:ring-1 focus:bg-white focus:ring-blue-400  ${
                          touched.email && errors.email
                            ? "border border-red-500"
                            : "border border-gray-200"
                        }`}
                      />
                      <span className="material-symbols-outlined absolute left-2 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                        <FaUser />
                      </span>
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div className="group w-full mb-6">
                    <label
                      htmlFor="password"
                      className="inline-block mb-2 font-bold w-full text-sm text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                    >
                      Password
                    </label>
                    <div className="relative flex items-center">
                      <Field
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        className={`peer relative h-10 w-full outline-none rounded-md bg-gray-50 pl-10 pr-4 font-thin drop-shadow-sm transition-all duration-200 ease-in-out focus:ring-1 focus:bg-white focus:ring-blue-400  ${
                          touched.password && errors.password
                            ? "border border-red-500"
                            : "border border-gray-200"
                        }`}
                      />
                      <span className="material-symbols-outlined absolute left-2 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                        <FaLock />
                      </span>
                      <span
                        className="material-symbols-outlined absolute right-2 transition-all duration-200 ease-in-out group-focus-within:text-blue-400 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                    <div className="text-right">
                      <Link
                        href="/forgot-password"
                        className="text-sm text-gray-500 hover:text-blue-800 "
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>

                  <div className="flex text-center justify-between mb-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`outline-gray-50 bg-gray-200 text-gray-700 text-center w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                        !loading && "hover:bg-blue-200"
                      }`}
                    >
                      {loading ? (
                        <FiLoader className="animate-spin my-1 mx-auto" />
                      ) : (
                        "Login"
                      )}
                    </button>
                  </div>

                  <div className="text-center">
                    <Link
                      className="text-sm text-gray-500 hover:text-blue-800 "
                      href="/register"
                    >
                      Don&apos;t have an account? Register
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="flex items-center justify-center mb-8">
              <hr className="w-[20%] border-gray-400" />
              <span className="px-4 font-bold text-gray-500 text-center">
                Or Login with
              </span>
              <hr className="w-[20%] border-gray-400" />
            </div>
            <div className="lg:items-center lg:justify-around xl:items-center xl:justify-around 2xl:items-center 2xl:justify-around lg:flex xl:flex 2xl:flex">
              <div className="py-2">
                <button className="w-3/4 md:w-full lg:w-full xl:w-full 2xl:w-full m-auto bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex justify-center items-center">
                  <FaGoogle className="text-red-500 mr-2" />
                  <span>Sign in with Google</span>
                </button>
              </div>
              <div className="py-2">
                <button className="w-3/4 md:w-full lg:w-full xl:w-full 2xl:w-full m-auto bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 border border-gray-800 rounded shadow flex justify-center items-center">
                  <FaGithub className="text-white mr-2" />
                  <span>Sign in with GitHub</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
