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
            className={className || "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"}
        >
            {children || texto}
        </button>
    )
}