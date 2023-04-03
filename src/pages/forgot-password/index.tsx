import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import * as Yup from "yup";
import animationData from "../../../public/images/forgot_bg.json";
import Lottie from "react-lottie";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

function ForgotPassword() {
  const [loading, setLoading] = useState<boolean>(false);

  function submitHandler(values: any) {
    setLoading(true);
    // API call to send email
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
    <div className="h-screen w-full relative">
      <div className="absolute w-full h-screen">
       <Lottie options={defaultOptions}  />
      </div>
      <div className="flex justify-center items-center h-full w-full p-3 relative">
        <div className="bg-white rounded-lg shadow-lg p-10 w-full md:w-[60%] lg:w-[40%] xl:w-[40%] 2xl:2-[40%]">
            <h1 className="text-4xl font-bold mb-10 text-center">
              Forgot Password
            </h1>
            <p className="text-center">
              Enter your email address below and we&apos;ll send you a link to
              reset your password.
            </p>
            <Formik
              initialValues={{ email: "" }}
              validationSchema={LoginSchema}
              onSubmit={(values) => {
                submitHandler(values);
              }}
            >
              {({ errors, touched }) => (
                <Form className=" pt-6 pb-8 mb-3">
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
                        "Send"
                      )}
                    </button>
                  </div>
                  <div className="text-center">
                    <Link
                      className="text-sm text-gray-500 hover:text-blue-800 "
                      href="/login"
                    >
                      Return to login screen
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>

            <p className="mb-4 text-center text-gray-700">
              If your email is associated with an account, we&apos;ll send you
              an email with instructions to reset your password.
            </p>

            <p className="text-center text-gray-400">
              If you encounter any issues, please contact us at &nbsp;
              <Link href="#" className="hover:text-blue-400">support@yourcompany.com</Link>.
            </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
