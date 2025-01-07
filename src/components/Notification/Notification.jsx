import './Notification.css';
import AlertIcon from '../../assets/Alert-icon-2.svg';
import SuccessIcon from '../../assets/Success-icon.svg';

function Notification({message, type = "error", onClose}) {
    const notificationType={
        error:{
            icon: AlertIcon,
            header: "Error",
            background:"#f8d7da",
            color: "#721c24",
        },
        success:{
            icon: SuccessIcon,
            header: "Success",
            background:"#d4edda",
            color: "#155724",
        },
        info:{
            icon: AlertIcon,
            header: "Info",
            background:"#d1ecf1",
            color: "#0c5460",
        },
    };

    const {icon, header, background, color} = notificationType[type] || notificationType.error;

    return (
        <div className="notification-overlay" onClick={onClose}>
            <div className="notification"
                style={{background, color}}>
                <div className="notification-icon-wrapper">
                    <img src={icon} alt={`${header} icon`}/>
                </div>
                <div className="notification-txt">
                    <span className="notification-header">{header}</span>
                    <span>{message}</span>
                </div>
                <button onClick={onClose}>&times;</button>
            </div>
        </div>

    )
}

export default Notification;