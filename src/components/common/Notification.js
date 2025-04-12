import { useEffect, useState } from "react";
import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const Notification = ({ message, type = "success", onClose }) => {
  const [isVisible, setIsVisible] = useState(!!message);

  useEffect(() => {
    setIsVisible(!!message);
    const timer = message
      ? setTimeout(() => {
          setIsVisible(false);
          onClose?.();
        }, 5000)
      : null;

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!isVisible) return null;

  const bgColor = type === "success" ? "bg-green-100" : "bg-red-100";
  const textColor = type === "success" ? "text-green-800" : "text-red-800";
  const Icon = type === "success" ? CheckCircleIcon : XCircleIcon;

  return (
    <div
      className={`fixed top-6 right-6 z-50 max-w-sm w-full shadow-lg rounded-lg pointer-events-auto transition-all duration-300 ${bgColor}`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon className={`h-6 w-6 ${textColor}`} />
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className={`text-sm font-medium ${textColor}`}>{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={() => {
                setIsVisible(false);
                onClose?.();
              }}
              className={`rounded-md inline-flex ${textColor} hover:${
                type === "success" ? "bg-green-200" : "bg-red-200"
              } focus:outline-none`}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
