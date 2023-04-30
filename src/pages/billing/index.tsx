import Link from "next/link";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/Billing/CheckoutForm";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { FiCreditCard, FiSkipBack } from "react-icons/fi";
import { getSession } from "next-auth/react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

export default function Billing() {
  const [clientSecret, setClientSecret] = useState("");
  const [itemName, setItemName] = useState<string | null>(null);

  useEffect(() => {
    async function getClientSecret() {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/billing/intent`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${window.localStorage.getItem(
              "accessToken"
            )}`,
          },
        })
        .then((res) => {
          setClientSecret(res.data.intent.client_secret);
          setItemName(res.data.item);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getClientSecret();
  }, []);

  return (
    <>
      <Navbar />
      <main
        className="flex w-screen bg-gray-100"
        style={{ minHeight: "calc(100vh - 4rem)" }}
      >
        <aside className="w-72 m-6 p-6">
          <h1 className="text-2xl font-bold flex gap-2 items-center">
            <FiCreditCard />
            <span>Billing</span>
          </h1>
          <Link
            href="/playgrounds"
            className="hover:underline flex gap-2 items-center mt-4"
          >
            <FiSkipBack />
            <span>Back To Playgrounds</span>
          </Link>
        </aside>
        <section className="bg-white flex-1 m-6 p-6 shadow-lg rounded-lg">
          {clientSecret !== "" ? (
            <Elements
              stripe={stripePromise}
              options={{ clientSecret: clientSecret }}
            >
              {itemName ? (
                <CheckoutForm plan={itemName} />
              ) : (
                <div>Loading...</div>
              )}
            </Elements>
          ) : (
            <div>Loading...</div>
          )}
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps({ req }: { req: any }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
