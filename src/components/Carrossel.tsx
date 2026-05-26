type ItemCarrossel = {
  label: string;
  color: string;
};

type CarrosselProps = {
  itens: ItemCarrossel[];
};

export function Carrossel({ itens }: CarrosselProps) {
  return (
    <div className="mt-6 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth">
      {itens.map(({ label, color }) => (
        <div
          key={label}
          className={`
            snap-start flex h-40 min-w-[80vw] items-center justify-center
            rounded-2xl ${color} text-white shadow-lg
            sm:min-w-[260px]
          `}
        >
          {label}
        </div>
      ))}
    </div>
  );
}