export const GithubIcon = ({
    width = 40,
    height = 40,
    color = '#A0A0A0'
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M9 1.125C4.65117 1.125 1.125 4.74258 1.125 9.20039C1.125 12.7688 3.38203 15.7922 6.51094 16.8609C6.55482 16.8705 6.59962 16.8752 6.64453 16.875C6.93633 16.875 7.04883 16.6605 7.04883 16.4742C7.04883 16.2809 7.0418 15.7746 7.03828 15.0996C6.77779 15.1607 6.5113 15.1925 6.24375 15.1945C4.72852 15.1945 4.38398 14.0168 4.38398 14.0168C4.02539 13.0852 3.50859 12.8355 3.50859 12.8355C2.82305 12.3539 3.50508 12.3398 3.55781 12.3398H3.56133C4.35234 12.4102 4.76719 13.1766 4.76719 13.1766C5.16094 13.8656 5.68828 14.059 6.15937 14.059C6.47087 14.0528 6.77755 13.9809 7.05938 13.848C7.12969 13.3277 7.33359 12.9727 7.55859 12.7688C5.81133 12.5648 3.97266 11.8723 3.97266 8.77852C3.97266 7.89609 4.27852 7.17539 4.78125 6.61289C4.70039 6.40898 4.42969 5.58633 4.85859 4.47539C4.91613 4.46162 4.97526 4.45571 5.03437 4.45781C5.31914 4.45781 5.9625 4.5668 7.02422 5.30508C8.31429 4.94413 9.67868 4.94413 10.9688 5.30508C12.0305 4.5668 12.6738 4.45781 12.9586 4.45781C13.0177 4.45571 13.0768 4.46162 13.1344 4.47539C13.5633 5.58633 13.2926 6.40898 13.2117 6.61289C13.7145 7.17891 14.0203 7.89961 14.0203 8.77852C14.0203 11.8793 12.1781 12.5613 10.4238 12.7617C10.7051 13.0113 10.9582 13.5035 10.9582 14.2559C10.9582 15.3352 10.9477 16.207 10.9477 16.4707C10.9477 16.6605 11.0566 16.875 11.3484 16.875C11.3957 16.8752 11.4428 16.8705 11.4891 16.8609C14.6215 15.7922 16.875 12.7652 16.875 9.20039C16.875 4.74258 13.3488 1.125 9 1.125Z" fill={color}/>
        </svg>
    );
}