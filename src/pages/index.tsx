import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  let [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (window.localStorage.getItem("accessToken")) {
      setAccessToken(window.localStorage.getItem("accessToken"));
    }
  }, []);

  return (
    <main className="h-screen flex w-full">
      <section className="bg-cred h-full w-full flex flex-col">
        <div className="flex-1 flex flex-col">
          <nav className="font-mono font-extrabold text-lg p-6">OLNX</nav>
          <section className="relative flex-1">
            <img
              className="w-96 absolute bottom-0 left-12"
              src="/images/bot-1-transformed.png"
              alt="Photo of two AI bots talking to one another."
            />
          </section>
        </div>
        <div className="h-96 bg-cred-light p-12 flex flex-col gap-2">
          <h2 className="text-3xl font-bold uppercase">Welcome To OLNX</h2>
          <p className="font-mono">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt
            placeat perferendis qui consequuntur nesciunt architecto! Odio
            incidunt porro aut doloremque, dolore id eveniet quidem dignissimos
            dolorem officiis commodi, recusandae omnis?
          </p>
          <div className="flex">
            <span className="flex-1" />
            <button className="px-6 py-3 bg-cred-dark rounded-full border-4 border-cred">
              Get Started
            </button>
          </div>
        </div>
      </section>
      <section className="bg-cgreen-dark h-full w-full flex flex-col">
        <div className="flex-1 flex flex-col">
          <nav className="flex flex-row p-6 gap-4 items-center">
            <span className="flex-1" />

            {accessToken ? (
              <>
                <Link href="/playground">Playground</Link>
                <Link href="/billing">Billing</Link>
                <Link
                  href="/logout"
                  className="p-2 bg-cgreen-light rounded-full flex gap-2 items-center"
                >
                  <img
                    className="w-10 h-10 bg-cgreen-dark rounded-full"
                    src="https://api.dicebear.com/5.x/micah/svg"
                    alt="Profile Picture"
                  />
                  <span>Logout</span>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
              </>
            )}
          </nav>
          <section className="relative flex-1">
            <img
              className="w-96 absolute bottom-0 right-12"
              src="/images/bot-2-transformed.png"
              alt="Photo of two AI bots talking to one another."
            />
          </section>
        </div>
        <div className="h-96 bg-cgreen-light p-12 flex flex-col gap-2">
          <h2 className="text-3xl font-bold uppercase">Welcome To OLNX</h2>
          <p className="font-mono">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt
            placeat perferendis qui consequuntur nesciunt architecto! Odio
            incidunt porro aut doloremque, dolore id eveniet quidem dignissimos
            dolorem officiis commodi, recusandae omnis?
          </p>
          <div className="flex">
            <button className="px-6 py-3 bg-cgreen rounded-full border-4 border-cgreen-dark">
              Get Started
            </button>
            <span className="flex-1" />
          </div>
        </div>
      </section>
    </main>
  );
}
