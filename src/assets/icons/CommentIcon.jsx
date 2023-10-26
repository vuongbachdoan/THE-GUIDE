export const CommentIcon = ({
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
            <path d="M30.9615 6H9.03846C7.96833 6.00308 6.9429 6.43427 6.1862 7.19938C5.4295 7.96449 5.00304 9.00131 5 10.0833V24.0833C5.00304 25.1654 5.4295 26.2022 6.1862 26.9673C6.9429 27.7324 7.96833 28.1636 9.03846 28.1667H11.9231V34L18.6817 28.3023C18.7855 28.2146 18.9165 28.1666 19.0517 28.1667H30.9615C32.0317 28.1636 33.0571 27.7324 33.8138 26.9673C34.5705 26.2022 34.997 25.1654 35 24.0833V10.0833C34.997 9.00131 34.5705 7.96449 33.8138 7.19938C33.0571 6.43427 32.0317 6.00308 30.9615 6Z" fill={color}/>
        </svg>
    );
}