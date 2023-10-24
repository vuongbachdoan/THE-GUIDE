export const MailIcon = ({
    width = 40,
    height = 40,
    color = '#A0A0A0'
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M14.9062 3.375H3.09375C2.3171 3.375 1.6875 4.0046 1.6875 4.78125V13.2188C1.6875 13.9954 2.3171 14.625 3.09375 14.625H14.9062C15.6829 14.625 16.3125 13.9954 16.3125 13.2188V4.78125C16.3125 4.0046 15.6829 3.375 14.9062 3.375Z" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3.9375 5.625L9 9.5625L14.0625 5.625" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
}