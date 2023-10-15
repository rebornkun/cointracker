import { notification } from "antd";
import { CancelSvg, SuccessSvg, WarningSvg } from "./svg";

notification.config({
  duration: 5, // it's seconds
  placement: "bottomLeft",
});
const showNotification = ({ message, description, ...props }) => {
  notification.open({
    message: <p className="text-[1rem] font-bold">{message}</p>,
    description: description && (
      <p className="text-[0.8rem] font-light">{description}</p>
    ),
    ...props,
  });
};

class Notification {
  info({ ...props }) {
    showNotification({ ...props });
  }
  warning({ ...props }) {
    showNotification({
      type: "warning",
      icon: <WarningSvg className="warningIcon" />,
      ...props,
    });
  }
  success({ ...props }) {
    showNotification({
      type: "success",
      icon: <SuccessSvg className="successIcon" />,
      ...props,
    });
  }

  error({ ...props }) {
    const key = `notif${Math.random()}`;

    showNotification({
      type: "error",
      icon: <CancelSvg className="errorIcon" />,
      key,
      duration: 100,
      ...props,
    });
  }

  displayInfo(message) {
    if (message.message === "Info") {
      this.info(message);
    }
    if (message.message === "Warning") {
      this.warning(message);
    }
    if (message.message === "Success") {
      this.success(message);
    }
    if (message.message === "Error") {
      this.error(message);
    }
  }
}

const DestroyNotifications = () => {
  notification.destroy();
};

// export { DestroyNotifications, Notification };
// eslint-disable-next-line import/no-anonymous-default-export
export default new Notification();
