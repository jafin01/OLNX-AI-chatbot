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
import Image from "next/image";
import { useRouter } from "next/router";
import { FiLoader, FiLogIn } from "react-icons/fi";

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required").min(6),
  confirmPassword: Yup.string()
    .required("Required")
    .min(6)
    .equals([Yup.ref("password")], "Passwords must match"),
});

function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const { push } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  async function submitHandler(values: any) {
    console.log(values);
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <main className="w-full h-screen bg-gray-100 flex">
      <aside className="h-full w-full p-36">
        <Lottie options={defaultOptions} />
      </aside>
      <section className="w-full flex justify-between flex-col h-full z-50">
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold mb-4 text-center">Register</h1>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={RegisterSchema}
              onSubmit={(values) => {
                submitHandler(values);
              }}
            >
              {({ errors, touched }) => (
                <Form className="px-8 pt-6 pb-8 mb-3">
                  <div className="flex gap-4">
                    <div className="group w-72 md:w-80 lg:w-96 mb-6">
                      <label
                        htmlFor="firstName"
                        className="text-sm mb-2 font-bold inline-block w-full text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                      >
                        First Name
                      </label>
                      <div className="relative flex items-center ">
                        <Field
                          id="firstName"
                          type="firstName"
                          name="firstName"
                          placeholder="First Name"
                          className={`peer relative h-10 w-full outline-none rounded-md bg-gray-50 pl-10 pr-4 font-thin drop-shadow-sm transition-all duration-200 ease-in-out focus:ring-1 focus:bg-white focus:ring-blue-400  ${
                            touched.firstName && errors.firstName
                              ? "border border-red-500"
                              : "border border-gray-200"
                          }`}
                        />
                        <span className="material-symbols-outlined absolute left-2 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                          <FaUser />
                        </span>
                      </div>
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div className="group w-72 md:w-80 lg:w-96 mb-6">
                      <label
                        htmlFor="lastName"
                        className="text-sm mb-2 font-bold inline-block w-full text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                      >
                        Last Name
                      </label>
                      <div className="relative flex items-center ">
                        <Field
                          id="lastName"
                          type="lastName"
                          name="lastName"
                          placeholder="Last Name"
                          className={`peer relative h-10 w-full outline-none rounded-md bg-gray-50 pl-10 pr-4 font-thin drop-shadow-sm transition-all duration-200 ease-in-out focus:ring-1 focus:bg-white focus:ring-blue-400  ${
                            touched.lastName && errors.lastName
                              ? "border border-red-500"
                              : "border border-gray-200"
                          }`}
                        />
                        <span className="material-symbols-outlined absolute left-2 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                          <FaUser />
                        </span>
                      </div>
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>

                  <div className="group w-72 md:w-80 lg:w-96 mb-6">
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

                  <div className="group w-72 md:w-80 lg:w-96 mb-6">
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
                  </div>

                  <div className="group w-72 md:w-80 lg:w-96 mb-10">
                    <label
                      htmlFor="confirmPassword"
                      className="inline-block mb-2 font-bold w-full text-sm text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                    >
                      Confirm Password
                    </label>
                    <div className="relative flex items-center">
                      <Field
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Enter your confirmPassword"
                        className={`peer relative h-10 w-full outline-none rounded-md bg-gray-50 pl-10 pr-4 font-thin drop-shadow-sm transition-all duration-200 ease-in-out focus:ring-1 focus:bg-white focus:ring-blue-400  ${
                          touched.confirmPassword && errors.confirmPassword
                            ? "border border-red-500"
                            : "border border-gray-200"
                        }`}
                      />
                      <span className="material-symbols-outlined absolute left-2 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                        <FaLock />
                      </span>
                      <span
                        className="material-symbols-outlined absolute right-2 transition-all duration-200 ease-in-out group-focus-within:text-blue-400 cursor-pointer"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
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
                        "Sign Up"
                      )}
                    </button>
                  </div>

                  <div className="text-center">
                    <Link
                      className="text-sm text-gray-500 hover:text-blue-800 "
                      href="/login"
                    >
                      Already have an account? Login
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="flex items-center justify-center mb-8">
              <hr className="w-[20%] border-gray-400" />
              <span className="px-4 font-bold text-gray-500 text-center">
                Or Sign up with
              </span>
              <hr className="w-[20%] border-gray-400" />
            </div>
            <div className="flex items-center justify-around">
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex items-center">
                <FaGoogle className="text-red-500 mr-2" />
                <span>Sign up with Google</span>
              </button>
              <button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 border border-gray-800 rounded shadow flex items-center">
                <FaGithub className="text-white mr-2" />
                <span>Sign up with GitHub</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;
