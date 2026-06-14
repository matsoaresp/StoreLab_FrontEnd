type ItemCarrossel = {
  label: string;
  color: string;
};

type CarrosselProps = {
  itens: ItemCarrossel[];
};

export function Carrossel({ itens }: CarrosselProps) {
  return (
    <div className="mt-6 flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth hide-scrollbar">
      {itens.map(({ label, color }) => (
        <div
          key={label}
          className={`
            snap-start flex h-48 min-w-[80vw] items-center justify-center
            rounded-2xl ${color} text-white shadow-[0_10px_20px_rgba(0,0,0,0.2)]
            sm:min-w-[280px] font-bold text-xl
          `}
        >
          {label}
        </div>
      ))}
    </div>
  );
}