type HeaderProps = {
  titulo: string;
  subtitulo?: string;
};

export function Header({ titulo, subtitulo }: HeaderProps) {
  return (
    <header className="w-full pb-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white">{titulo}</h1>

      {subtitulo && (
        <p className="mt-2 text-base md:text-lg text-gray-300">
          {subtitulo}
        </p>
      )}
    </header>
  );
}

export default Header;