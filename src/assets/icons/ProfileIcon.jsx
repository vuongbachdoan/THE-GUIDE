export const ProfileIcon = ({
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
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20 11.3907C18.572 11.3907 17.2759 12.0355 16.4381 13.0164C15.5946 14.0041 15.1893 15.3738 15.6526 16.7638C15.7033 16.9158 15.7542 17.0733 15.8063 17.2343C16.0896 18.1095 16.4062 19.0877 16.8905 19.8542C17.1923 20.3318 17.5835 20.7741 18.1147 21.0933C18.6513 21.4158 19.2784 21.5812 20 21.5812C20.7215 21.5812 21.3486 21.4158 21.8852 21.0933C22.4164 20.7741 22.8077 20.3318 23.1094 19.8542C23.5937 19.0877 23.9104 18.1095 24.1936 17.2343C24.2457 17.0733 24.2967 16.9158 24.3474 16.7638C24.8107 15.3738 24.4054 14.0041 23.5619 13.0164C22.7241 12.0355 21.428 11.3907 20 11.3907ZM17.7741 14.1575C17.2672 14.7511 17.0799 15.4898 17.3194 16.2082C17.3816 16.3946 17.4404 16.5749 17.4972 16.7491C17.7846 17.6301 18.0205 18.3533 18.3759 18.9158C18.5737 19.2289 18.7836 19.4454 19.0198 19.5874C19.2506 19.7261 19.5571 19.8242 20 19.8242C20.4429 19.8242 20.7494 19.7261 20.9802 19.5874C21.2164 19.4454 21.4263 19.2289 21.6241 18.9158C21.9795 18.3533 22.2154 17.6301 22.5028 16.7491C22.5596 16.5749 22.6184 16.3946 22.6806 16.2082C22.92 15.4898 22.7328 14.7511 22.2258 14.1575C21.7131 13.5572 20.9008 13.1477 20 13.1477C19.0992 13.1477 18.2868 13.5572 17.7741 14.1575Z" fill={color} />
            <path d="M28.0822 28.6092C28.0822 24.3396 24.5682 22.9868 19.8244 22.9868C15.0805 22.9868 11.918 24.3396 11.918 28.6092" stroke={color} stroke-width="2.00214" stroke-linecap="round" />
        </svg>
    );
}