export const HappyIcon = ({
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
            <path d="M14.375 20C15.4105 20 16.25 19.1605 16.25 18.125C16.25 17.0895 15.4105 16.25 14.375 16.25C13.3395 16.25 12.5 17.0895 12.5 18.125C12.5 19.1605 13.3395 20 14.375 20Z" fill={color} />
            <path d="M20.004 30.0001C16.4555 30.0001 13.4712 27.693 12.5266 24.5446C12.5002 24.4509 12.496 24.3523 12.5145 24.2568C12.5329 24.1612 12.5734 24.0712 12.6327 23.994C12.692 23.9169 12.7686 23.8546 12.8562 23.8123C12.9439 23.7699 13.0402 23.7486 13.1376 23.7501H26.8633C26.9607 23.7486 27.057 23.7699 27.1447 23.8123C27.2323 23.8546 27.3089 23.9169 27.3682 23.994C27.4275 24.0712 27.468 24.1612 27.4864 24.2568C27.5049 24.3523 27.5007 24.4509 27.4743 24.5446C26.5376 27.693 23.5524 30.0001 20.004 30.0001Z" fill={color} />
            <path d="M25.625 20C26.6605 20 27.5 19.1605 27.5 18.125C27.5 17.0895 26.6605 16.25 25.625 16.25C24.5895 16.25 23.75 17.0895 23.75 18.125C23.75 19.1605 24.5895 20 25.625 20Z" fill={color} />
            <path d="M20 36.25C28.9746 36.25 36.25 28.9746 36.25 20C36.25 11.0254 28.9746 3.75 20 3.75C11.0254 3.75 3.75 11.0254 3.75 20C3.75 28.9746 11.0254 36.25 20 36.25Z" stroke={color} stroke-width="1.5" stroke-miterlimit="10" />
        </svg>
    );
}