export const CameraIcon = ({
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
            <rect x="10.7857" y="15.9789" width="17.9762" height="11.5847" rx="2.39683" stroke={color} strokeWidth="1.99735" />
            <rect x="15.5794" y="11.9843" width="8.38889" height="3.99471" rx="0.399471" stroke={color} strokeWidth="1.99735" />
            <circle cx="19.7738" cy="21.7713" r="2.59656" stroke={color} strokeWidth="1.99735" />
        </svg>
    );
}