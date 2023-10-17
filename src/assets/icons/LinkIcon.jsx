export const LinkIcon = ({
    width = 40,
    height = 40,
    color = '#A0A0A0'
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
            <rect x="4" y="6.59998" width="7.2" height="5" rx="1" stroke={color} />
            <rect x="8.79999" y="8.19995" width="7.2" height="5" rx="1" stroke={color} />
        </svg>
    );
}