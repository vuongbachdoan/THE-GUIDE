export const PersonIcon = ({
    width = 40,
    height = 40,
    color = '#A0A0A0'
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M344 144C340.08 196.87 300 240 256 240C212 240 171.85 196.88 168 144C164 89 203 48 256 48C309 48 348 90 344 144Z" stroke={color} strokeWidth="36" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M256 304C169 304 80.7 352 64.36 442.6C62.39 453.52 68.57 464 80 464H432C443.44 464 449.62 453.52 447.65 442.6C431.3 352 343 304 256 304Z" stroke={color} strokeWidth="36" strokeMiterlimit="10" />
        </svg>
    );
}