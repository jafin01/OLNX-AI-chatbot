import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

export default function CheckoutForm({
  clientSecret,
  name,
  email,
}: {
  clientSecret: string;
  name: string;
  email: string;
}) {
  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(event: any) {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { setupIntent, error } = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        //@ts-ignore
        card: elements.getElement(CardElement),
        billing_details: {
          name: name,
          email: email,
        },
      },
    });

    if (error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(error.message);
    } else {
      // success
      console.log(setupIntent);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        disabled={!stripe}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow-md disabled:shadow-none disabled:bg-gray-300 disabled:text-gray-500"
      >
        Submit
      </button>
    </form>
  );
}
