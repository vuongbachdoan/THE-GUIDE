export const CloseIcon = ({
    width = 40,
    height = 40,
    color = '#A0A0A0'
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 513 513" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M256.732 48.0122C142.042 48.0122 48.7318 141.322 48.7318 256.012C48.7318 370.702 142.042 464.012 256.732 464.012C371.422 464.012 464.732 370.702 464.732 256.012C464.732 141.322 371.422 48.0122 256.732 48.0122ZM343.362 320.012L320.732 342.642L256.732 278.642L192.732 342.642L170.102 320.012L234.102 256.012L170.102 192.012L192.732 169.382L256.732 233.382L320.732 169.382L343.362 192.012L279.362 256.012L343.362 320.012Z" fill={color}/>
        </svg>
    );
}