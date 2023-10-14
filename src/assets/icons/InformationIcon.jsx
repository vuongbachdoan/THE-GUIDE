export const InformationIcon = ({
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
                transform="translate(0.25)" 
            />
            <circle cx="20.45" cy="20.2" r="9.4" stroke={color} stroke-width="2" />
            <path d="M20.25 18.9379L20.25 24.3999M20.25 15.5999L20.25 16.2068" stroke={color} stroke-width="2" stroke-linecap="round" />
        </svg>
    );
}