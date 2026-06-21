import unifilLogo from '../assets/unifilLogo.png';

interface HeaderProps {
  titulo: string;
}

export function Header({ titulo }: HeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-8 p-4 bg-[#252525] rounded-[24px]">
      <img 
        src={unifilLogo} 
        alt="Logo UniFil" 
        className="w-10 h-10 object-contain filter invert" 
      />
      <h1 className="text-3xl font-extrabold text-white tracking-tight">{titulo}</h1>
    </div>
  );
}