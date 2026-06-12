type ButtonProps = {
    texto?: string
    children?: React.ReactNode
    className?: string
    onClick?: () => void
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
}

export function Button({ texto, children, className = "", onClick, disabled = false, type = 'button' }: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={className || "w-full rounded-lg bg-white px-4 py-3 font-bold text-black transition hover:bg-gray-200 shadow-md disabled:opacity-50"}
        >
            {children || texto}
        </button>
    )
}