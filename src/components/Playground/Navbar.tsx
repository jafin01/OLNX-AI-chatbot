export default function PlaygroundNavbar() {
  return (
    <nav className="w-full border-b border-gray-300 h-16 p-6 flex justify-between items-center">
      <h2 className="font-semibold text-xl">Playground</h2>
      <div className="flex items-center gap-2">
        <button className="rounded px-4 py-2 bg-gray-300 text-gray-500">
          Save
        </button>
        <button className="rounded px-4 py-2 bg-gray-300 text-gray-500">
          Share
        </button>
        <button className="rounded px-4 py-2 bg-gray-300 text-gray-500">
          &middot;&middot;&middot;
        </button>
      </div>
    </nav>
  );
}
