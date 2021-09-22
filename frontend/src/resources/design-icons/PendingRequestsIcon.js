import SvgIcon from '@material-ui/core/SvgIcon';

export default function PendingRequestsIcon(props) {
    return (
        <SvgIcon {...props}>
            {/* <rect x="0.5" y="0.5" width="21" height="23" fill="white"/> */}
            <path d="M18 4H13.82C13.4 2.84 12.3 2 11 2C9.7 2 8.6 2.84 8.18 4H4C2.9 4 2 4.9 2 6V20C2 21.1 2.9 22 4 22H18C19.1 22 20 21.1 20 20V6C20 4.9 19.1 4 18 4ZM12 19H10V17H12V19ZM12 15H10V9H12V15ZM11 6C10.45 6 10 5.55 10 5C10 4.45 10.45 4 11 4C11.55 4 12 4.45 12 5C12 5.55 11.55 6 11 6Z" />
        </SvgIcon>
    );
}