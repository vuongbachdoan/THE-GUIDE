export const SubjectIcon = ({
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
            <rect x="11.212" y="16.4175" width="18.0193" height="11.6124" rx="2.40257" stroke={color} stroke-width="2.00214" />
            <path d="M16.8181 14.8158C16.8181 13.4889 17.8937 12.4132 19.2206 12.4132H21.2228C22.5497 12.4132 23.6253 13.4889 23.6253 14.8158V16.4175H16.8181V14.8158Z" stroke={color} stroke-width="2.00214" />
        </svg>
    );
}