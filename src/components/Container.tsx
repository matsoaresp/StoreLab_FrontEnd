interface Props {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: Props) {
  return (
    <div className={className || "min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-gray-100 to-gray-300"}>
      <div className="md:pl-64">        
        <div className="px-4 pt-16 pb-8 md:px-8 md:pt-8">
          {children}
        </div>
      </div>
    </div>
  );
}