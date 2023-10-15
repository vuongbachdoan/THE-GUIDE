export const LogoutIcon = ({
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
            <path d="M22.5 24.5V26.75C22.5 27.3467 22.2805 27.919 21.8898 28.341C21.4991 28.7629 20.9692 29 20.4167 29H12.0833C11.5308 29 11.0009 28.7629 10.6102 28.341C10.2195 27.919 10 27.3467 10 26.75V13.25C10 12.6533 10.2195 12.081 10.6102 11.659C11.0009 11.2371 11.5308 11 12.0833 11H20C21.1505 11 22.5 12.0074 22.5 13.25V15.5M25.8333 24.5L30 20L25.8333 15.5M15.8333 20H29.1667" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    );
}