import Link from "next/link";

export default function Billing() {
  return (
    <main className="flex h-screen w-screen bg-gray-100">
      <aside className="w-72 m-6 p-6">
        <h1>Billing</h1>
        <Link href="/playground" className="hover:underline">
          Back To Playground
        </Link>
      </aside>
      <section className="bg-white flex-1 m-6 p-6 shadow-lg rounded-lg">
        Billing Form
      </section>
    </main>
  );
}
