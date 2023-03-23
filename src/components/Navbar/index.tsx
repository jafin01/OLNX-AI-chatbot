import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="px-6 py-4 h-16 bg-white border-b border-gray-300 w-full flex justify-between items-center">
      <div className="font-mono text-lg">
        <Link href="/">
          <b className="font-bold">Z</b>Chat
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/billing"
          className="bg-white hover:bg-gray-300 px-4 py-2 rounded"
        >
          Billing
        </Link>
        <Link
          href="/logout"
          className="bg-white hover:bg-gray-300 px-4 py-2 rounded flex gap-2 items-center"
        >
          <img
            className="w-10 h-10 bg-cgreen-dark rounded-full"
            src="https://api.dicebear.com/5.x/micah/svg"
            alt="Profile Picture"
          />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
}
