type ButtonProps = {
    texto: string
}

export function Button({ texto }: ButtonProps) {
    return (
        <>
            <button>{texto}</button>
        </>
    )
}