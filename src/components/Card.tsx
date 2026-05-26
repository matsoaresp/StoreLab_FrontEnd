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
    <div className="w-full rounded-2xl bg-white p-6 shadow-lg md:p-8">
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:text-3xl">
        {titulo}
      </h2>

      <p className="mb-6 text-center text-sm text-gray-600 md:text-base">
        {descricao}
      </p>

      <div className="flex justify-center">
        <button
          onClick={onClick}
          className="rounded-lg bg-black px-5 py-2 text-white transition hover:bg-gray-800"
        >
          {textoBotao}
        </button>
      </div>
    </div>
  );
}