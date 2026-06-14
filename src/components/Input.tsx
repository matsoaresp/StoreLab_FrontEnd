type InputProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
};

export function Input({
  type = "text",
  placeholder = "Digite algo...",
  value,
  name,
  onChange,
  required = false,
  className,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      required={required}
      className={
        className ||
        "w-full rounded-lg bg-white px-4 py-3 text-sm font-semibold text-black placeholder-gray-500 outline-none transition focus:ring-2 focus:ring-[#F28E2B]"
      }
    />
  );
}