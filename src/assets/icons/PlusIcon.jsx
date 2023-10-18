export const PlusIcon = ({
    width = 40,
    height = 40,
    color = '#A0A0A0'
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                width={width}
                height={height}
                transform="translate(0.4375)"
            />
            <path d="M20.4375 11.9999V27.7999" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <path d="M12.5375 19.9H28.3375" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}