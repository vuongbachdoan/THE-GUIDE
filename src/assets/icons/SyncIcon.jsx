export const SyncIcon = ({
    width = 40,
    height = 40,
    color = '#A0A0A0'
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'
        >
            <path d='M15.2813 10.0403V8.99262C15.2813 5.52165 12.4604 2.70704 8.98132 2.70704C8.03488 2.70587 7.10037 2.9182 6.24736 3.32821C5.39435 3.73822 4.6448 4.33536 4.05452 5.07516M2.69995 7.95797V9.00563C2.69995 12.4805 5.51948 15.293 8.99995 15.293C9.94368 15.2916 10.8752 15.0797 11.7267 14.6727C12.5781 14.2657 13.3281 13.6739 13.9218 12.9403' stroke={color} stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' />
            <path d='M1.125 9L2.67188 7.45312L4.28906 9M16.875 9L15.3281 10.5469L13.7109 9' stroke={color} stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' />
        </svg>
    );
}