export const EyeIcon = ({
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
            <path d="M21.0033 15.2C26.2033 15.2 31.2033 20.2 31.2033 20.2C31.2033 20.2 26.2033 25.2001 21.0033 25.2C15.8033 25.2001 10.8033 20.2 10.8033 20.2C10.8033 20.2 15.8033 15.2 21.0033 15.2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="21.0033" cy="20.2" r="4.2" stroke={color} strokeWidth="2" />
        </svg>
    );
}