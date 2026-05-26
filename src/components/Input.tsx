type InputProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Input({
  type = "text",
  placeholder = "Digite algo...",
  value,
  onChange,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full rounded-lg bg-white/10 px-4 py-2 text-sm text-white placeholder-gray-400 outline-none ring-1 ring-white/20 transition focus:ring-white/50"
    />
  );
}