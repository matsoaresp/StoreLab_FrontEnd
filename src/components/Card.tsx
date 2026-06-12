type CardProps = {
  titulo: string;
  descricao: string;
  textoBotao: string;
  onClick?: () => void;
};

export function Card({
  titulo,
  descricao,
  textoBotao,
  onClick,
}: CardProps) {
  return (
    <div className="w-full max-w-md mx-auto rounded-[24px] bg-[#252525] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.15)] md:p-10">
      <h2 className="mb-4 text-center text-2xl font-bold text-white md:text-3xl">
        {titulo}
      </h2>

      <p className="mb-8 text-center text-sm text-gray-400 md:text-base">
        {descricao}
      </p>

      <div className="flex justify-center">
        <button
          onClick={onClick}
          className="w-full rounded-lg bg-white px-5 py-3 font-bold text-black transition hover:bg-gray-200"
        >
          {textoBotao}
        </button>
      </div>
    </div>
  );
}