import axios from "axios";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { push } = useRouter();

  useEffect(() => {
    if (window.localStorage.getItem("accessToken")) {
      push("/playground");
    }
  }, []);

  return (
    <main className="w-full h-screen bg-cred-dark flex">
      <aside className="h-full w-full relative">
        <img
          src="/images/bot-1-transformed.png"
          className="absolute bottom-0 w-96 left-12"
        />
      </aside>
      <section className="w-full bg-cgreen-dark relative p-6 flex justify-between flex-col h-full">
        <img
          src="/images/bot-2-transformed.png"
          className="absolute bottom-0 w-96 right-12"
        />
        <div>
          <h1 className="text-center text-7xl font-bold mb-6">Login</h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (values) => {
              axios
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
                  console.log(res);
                  window.localStorage.setItem("accessToken", res.data.token);
                  push("/");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            <Form className="p-6 rounded-lg bg-cgreen-light flex flex-col gap-4">
              <Field
                className="px-6 py-3 rounded-lg bg-cgreen-dark"
                placeholder="Email Address"
                type="email"
                id="email"
                name="email"
                required
              />
              <Field
                className="px-6 py-3 rounded-lg bg-cgreen-dark"
                placeholder="Password"
                type="password"
                id="password"
                name="password"
                required
              />
              <button
                className="px-6 py-3 rounded-lg bg-cgreen-dark text-lg font-bold"
                type="submit"
              >
                Login
              </button>
            </Form>
          </Formik>
        </div>
      </section>
    </main>
  );
}
