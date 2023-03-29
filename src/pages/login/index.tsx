import axios from "axios";
import { Formik, Form, Field } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiLoader, FiLogIn } from "react-icons/fi";
import { AiFillGoogleCircle } from "react-icons/ai";
import notify from "react-hot-toast";

export default function Login() {
  const { push } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (window.localStorage.getItem("accessToken")) {
      push("/playground");
    }
  }, []);

  return (
    <main className="w-full h-screen bg-gray-100 flex">
      <aside className="h-full w-full z-10">
        <img
          src="https://cdn.discordapp.com/attachments/1057346444996132895/1090577194381746246/haha_ham_An_Illustration_about_2_AI_bots_talking_to_each_other__7030f2b3-cbf4-44ab-a908-f128b7d37476.png"
          alt="2 AI Bots talking to each other"
          className="w-full h-full object-cover"
        />
      </aside>
      <section className="w-full flex justify-between flex-col h-full z-50">
        <div className="bg-white p-12 py-24 h-full shadow-lg">
          <h1 className="text-left text-6xl mb-6">Login</h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (values) => {
              setLoading(true);
              const toastLoadingId = notify.loading("Logging in...");
              await axios
                .post(
                  `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
                  {
                    email: values.email,
                    password: values.password,
                  },
                  {
                    headers: {
                      Accept: "application/json",
                    },
                  }
                )
                .then((res) => {
                  // console.log(res);
                  window.localStorage.setItem("accessToken", res.data.token);
                  notify.dismiss(toastLoadingId);
                  notify.success("Logged in successfully");
                  push("/");
                })
                .catch((err) => {
                  // console.log(err);
                  notify.dismiss(toastLoadingId);
                  notify.error("Invalid Credentials");
                });

              setLoading(false);
            }}
          >
            <Form className="rounded-lg flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <Field
                  className="px-6 py-3 rounded-lg bg-gray-100"
                  placeholder="Email Address"
                  type="email"
                  id="email"
                  name="email"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <Field
                  className="px-6 py-3 rounded-lg bg-gray-100"
                  placeholder="Password"
                  type="password"
                  id="password"
                  name="password"
                  required
                />
              </div>
              <button
                className="px-6 py-3 rounded-lg text-lg text-white bg-blue-500 flex items-center justify-around disabled:bg-gray-500"
                type="submit"
                disabled={loading}
              >
                <div className="flex gap-2 items-center">
                  {loading ? (
                    <FiLoader className="animate-spin" />
                  ) : (
                    <FiLogIn />
                  )}
                  <span>Login</span>
                </div>
              </button>
              <div className="text-right text-blue-500 hover:underline">
                <Link href="/register">Don&lsquo;t have an account?</Link>
              </div>
            </Form>
          </Formik>
          <div className="flex items-center gap-2 my-6 text-gray-500">
            <div className="flex-1 border border-gray-300 h-0">&nbsp;</div>
            <div>OR</div>
            <div className="flex-1 border border-gray-300 h-0">&nbsp;</div>
          </div>
          <div>
            <button className="w-full flex items-center justify-around bg-white active:bg-gray-100 shadow-lg text-lg text-gray-500 rounded border border-gray-300">
              <AiFillGoogleCircle size="32" className="ml-6 text-blue-500" />
              <span className="px-6 py-3 flex-1">Login with Google</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
