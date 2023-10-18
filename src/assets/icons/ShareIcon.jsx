export const ShareIcon = ({
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
            <path d="M25.2519 14.0634C25.7375 13.8768 26.2145 14.3538 26.028 14.8394L20.6396 28.863C20.431 29.406 19.6494 29.3649 19.4989 28.803L18.1527 23.7789C17.912 22.8808 17.2105 22.1793 16.3124 21.9387L11.2883 20.5924C10.7264 20.4419 10.6853 19.6603 11.2283 19.4517L25.2519 14.0634L24.8929 13.129L25.2519 14.0634Z" stroke={color} strokeWidth="2.00193" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}