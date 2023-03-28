import {
  AddressElement,
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CheckoutForm({ plan }: { plan?: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = useState<null | string>(null);
  const { push } = useRouter();

  async function handleSubmit(event: any) {
    event.preventDefault();

    if (!stripe || !elements || !plan) {
      return;
    }

    const { error, setupIntent } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: document.location.origin,
      },
      redirect: "if_required",
    });

    if (error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(error.message);
    } else {
      if (setupIntent.payment_method) {
        await setPaymentMethod(setupIntent.payment_method as string);
        await axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/billing`,
            {
              payment_method: setupIntent.payment_method,
              plan: plan,
            },
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${window.localStorage.getItem(
                  "accessToken"
                )}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            window.location.href = res.data.callback_url.replace(
              "URL_REPLACE_ME",
              document.location.origin + "/playgrounds"
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <AddressElement options={{ mode: "billing" }} />
      <PaymentElement />
      {paymentMethod ? (
        <input type="hidden" name="payment_method" value={paymentMethod} />
      ) : (
        <></>
      )}
      <input type="hidden" name="plan" value={plan} />
      <button
        disabled={!stripe}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow-md disabled:shadow-none disabled:bg-gray-300 disabled:text-gray-500"
      >
        Submit
      </button>
    </form>
  );
}
