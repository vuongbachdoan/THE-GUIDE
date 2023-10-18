export const AddPostIcon = ({
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
            <path d="M26.5 22.75V26.8C26.5 27.4628 25.9627 28 25.3 28H14.7C14.0373 28 13.5 27.4628 13.5 26.8V15.2C13.5 14.5373 14.0373 14 14.7 14H18.3619" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M26.5 9.5L26.5 18.5M22 14L31 14" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}