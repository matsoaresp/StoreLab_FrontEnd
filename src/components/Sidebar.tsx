import { useState } from "react";
import { Input } from "./Input";

type SidebarProps = {
  titulo: string;
  categorias: string[];
};

export function Sidebar({ titulo, categorias }: SidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="fixed left-4 top-4 z-50 flex flex-col gap-1.5 rounded-lg bg-gray-950 p-2.5 md:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <span
          className={`block h-0.5 w-5 bg-white transition-all duration-300 ${
            open ? "translate-y-2 rotate-45" : ""
          }`}
        />

        <span
          className={`block h-0.5 w-5 bg-white transition-all duration-300 ${
            open ? "opacity-0" : ""
          }`}
        />

        <span
          className={`block h-0.5 w-5 bg-white transition-all duration-300 ${
            open ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-white/10
          bg-gray-950 p-6 text-white transition-transform duration-300
          md:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <h2 className="mb-10 text-2xl font-bold tracking-wide">
          {titulo}
        </h2>

        <div className="mb-8">
          <Input placeholder="Buscar categoria" />
        </div>

        <ul className="flex flex-col gap-4">
          {categorias.map((item) => (
            <li
              key={item}
              className="cursor-pointer rounded-xl px-4 py-3 font-medium transition-all duration-300 hover:bg-gray-800"
              onClick={() => setOpen(false)}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}