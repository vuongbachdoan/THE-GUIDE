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
           <path d="M3.75 31.1922C3.75 26.1867 4.87813 22.1875 7.10234 19.2969C9.78828 15.807 14.0305 13.9242 19.7242 13.6914V5.625L36.25 19.6875L19.7242 33.75V25.7305C16.2672 25.8234 13.657 26.3227 11.5781 27.2805C9.33203 28.3156 7.70313 29.8625 5.94688 31.8664L3.75 34.375V31.1922Z" fill={color}/>
        </svg>
    );
}