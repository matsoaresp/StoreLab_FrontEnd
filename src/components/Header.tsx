type HeaderProps = {
  titulo: string;
  subtitulo?: string;
};

export function Header({ titulo, subtitulo }: HeaderProps) {
  return (
    <header className="w-full rounded-2xl bg-black p-6 text-white shadow-lg">
      <h1 className="text-3xl font-bold">{titulo}</h1>

      {subtitulo && (
        <p className="mt-2 text-sm text-gray-300">
          {subtitulo}
        </p>
      )}
    </header>
  );
}

export default Header;