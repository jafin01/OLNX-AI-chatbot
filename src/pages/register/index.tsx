import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import axios from "axios";
import notify from "react-hot-toast";
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
import { getSession } from "next-auth/react";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required").min(6),
  password_confirmation: Yup.string()
    .required("Required")
    .min(6)
    .equals([Yup.ref("password")], "Passwords must match"),
});

function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { push } = useRouter();

  // useEffect(() => {
  //   if (window.localStorage.getItem("accessToken")) {
  //     push("/playgrounds");
  //   }
  // }, [push]);

  const [loading, setLoading] = useState<boolean>(false);

  async function submitHandler(values: any) {
    console.log(values);
    console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/register`)
    setLoading(true);
    const toastLoadingId = notify.loading("Logging in...");
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
        {
          name: values.name,
          email: values.email,
          password: values.password,
          password_confirmation: values.password_confirmation,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        window.localStorage.setItem("accessToken", res.data.token);
        notify.dismiss(toastLoadingId);
        notify.success("Registered Successfully");
        push("/playgrounds");
      })
      .catch((err) => {
        console.log(err);
        // console.log(err);
        notify.dismiss(toastLoadingId);
        notify.error("Invalid Credentials");
      });

    setLoading(false);
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
      <aside className="hidden h-full w-full lg:block xl:block pt-36 2xl:block">
        <Lottie options={defaultOptions} />
      </aside>
      <section className="w-full flex justify-between flex-col h-full z-50">
        <div className="pt-36 md:p-0 lg:p-0 xl:p-0 2xl:p-0 flex flex-col items-center justify-center min-h-screen bg-gray-50">
          <div className="w-full max-w-md">
            <h1 className="text-center text-5xl font-extrabold leading-10 tracking-tight text-gray-900 md:text-center sm:leading-none md:text-6xl lg:text-7xl">
              <span className="inline md:block">
                Re
                <span className="relative text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500">
                  gist
                </span>
                er
              </span>
            </h1>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
              }}
              validationSchema={RegisterSchema}
              onSubmit={(values) => {
                submitHandler(values);
              }}
            >
              {({ errors, touched }) => (
                <Form className="px-8 pt-6 pb-8 mb-3">
                  <div className="flex gap-4">
                    <div className="group w-full mb-6">
                      <label
                        htmlFor="name"
                        className="text-sm mb-2 font-bold inline-block w-full text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                      >
                        Name
                      </label>
                      <div className="relative flex items-center ">
                        <Field
                          id="name"
                          type="name"
                          name="name"
                          placeholder="Enter your Name"
                          className={`peer relative h-10 w-full outline-none rounded-md bg-gray-50 pl-10 pr-4 font-thin drop-shadow-sm transition-all duration-200 ease-in-out focus:ring-1 focus:bg-white focus:ring-blue-400  ${
                            touched.name && errors.name
                              ? "border border-red-500"
                              : "border border-gray-200"
                          }`}
                        />
                        <span className="material-symbols-outlined absolute left-2 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                          <FaUser />
                        </span>
                      </div>
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>

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
                  </div>

                  <div className="group w-full mb-10">
                    <label
                      htmlFor="confirmPassword"
                      className="inline-block mb-2 font-bold w-full text-sm text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                    >
                      Confirm Password
                    </label>
                    <div className="relative flex items-center">
                      <Field
                        id="password_confirmation"
                        type={showConfirmPassword ? "text" : "password"}
                        name="password_confirmation"
                        placeholder="Confirm Password"
                        className={`peer relative h-10 w-full outline-none rounded-md bg-gray-50 pl-10 pr-4 font-thin drop-shadow-sm transition-all duration-200 ease-in-out focus:ring-1 focus:bg-white focus:ring-blue-400  ${
                          touched.password_confirmation &&
                          errors.password_confirmation
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
                      name="password_confirmation"
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

            {/* <div className="flex items-center justify-center mb-8">
              <hr className="w-[20%] border-gray-400" />
              <span className="px-4 font-bold text-gray-500 text-center">
                Or Sign up with
              </span>
              <hr className="w-[20%] border-gray-400" />
            </div>
            <div className="md:flex lg:flex xl:flex 2xl:flex items-center justify-around">
              <div className="py-2">
                <button className="w-3/4 md:w-full lg:w-full xl:w-full 2xl:w-full m-auto bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex justify-center items-center">
                  <FaGoogle className="text-red-500 mr-2" />
                  <span>Sign up with Google</span>
                </button>
              </div>
              <div className="py-2">
                <button className="w-3/4 md:w-full lg:w-full xl:w-full 2xl:w-full m-auto bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 border border-gray-800 rounded shadow flex justify-center items-center">
                  <FaGithub className="text-white mr-2" />
                  <span>Sign up with GitHub</span>
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
