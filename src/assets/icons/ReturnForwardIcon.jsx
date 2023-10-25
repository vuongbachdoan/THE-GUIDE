export const ReturnForwardIcon = ({
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
            <path fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="45" d="M400 160l64 64-64 64" /><path d="M448 224H154c-58.76 0-106 49.33-106 108v20" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="45" />
        </svg>
    );
}