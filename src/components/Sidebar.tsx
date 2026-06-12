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
        className="fixed left-4 top-4 z-50 flex flex-col gap-1.5 rounded-lg bg-[#F28E2B] p-2.5 md:hidden shadow-lg"
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
          className="fixed inset-0 z-30 bg-black/60 md:hidden backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-40 flex h-screen w-64 flex-col
          bg-[#F28E2B] p-6 text-white transition-transform duration-300 shadow-xl
          md:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="mb-10 flex items-center gap-3">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M21.75 3.75L12 18l-3-4.5h-5.25l7.5 11.25L24 6H21.75z" />
          </svg>
          <h2 className="text-2xl font-extrabold tracking-wide">
            {titulo}
          </h2>
        </div>

        <div className="mb-8">
          <Input 
            placeholder="Buscar categoria" 
            className="w-full rounded-lg bg-[#1E1E1E] px-4 py-3 text-sm text-white placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-white/50 border-none"
          />
        </div>

        <ul className="flex flex-col gap-2">
          {categorias.map((item) => (
            <li
              key={item}
              className="cursor-pointer rounded-lg px-4 py-3 font-semibold transition-all duration-300 hover:bg-white/20"
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