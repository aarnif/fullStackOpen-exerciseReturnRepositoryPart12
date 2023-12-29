import { NotificationBox } from "../styles";

const Notification = ({ info }) => {
  if (!info.message) {
    return;
  }

  return <NotificationBox type={info.type}>{info.message}</NotificationBox>;
};

export default Notification;
