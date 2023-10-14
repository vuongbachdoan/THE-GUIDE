export const HomeIcon = ({
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
            />
            <path d="M28.8308 19.2205L21.5428 13.2576C20.6578 12.5335 19.385 12.5335 18.5 13.2576L11.212 19.2205" stroke={color} stroke-width="2.00214" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13.6146 17.2183V26.8286C13.6146 27.492 14.1524 28.0299 14.8158 28.0299H24.8266C25.49 28.0299 26.0278 27.492 26.0278 26.8286V17.2183" stroke={color} stroke-width="2.00214" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
}