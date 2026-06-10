type InputProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export function Input({
  type = "text",
  placeholder = "Digite algo...",
  value,
  name,
  onChange,
  required = false,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      required={required}
      className="w-full rounded-lg bg-white text-black px-4 py-2 text-sm placeholder-gray-600 outline-none border border-white transition focus:ring-2 focus:ring-blue-400 focus:border-transparent"
    />
  );
}