import { createContext, useContext, useState } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (type, title, message, duration = 5000) => {
    const id = Date.now();
    const notification = { id, type, title, message };
    
    setNotifications(prev => [...prev, notification]);

    // Auto-remove after duration
    setTimeout(() => {
      removeNotification(id);
    }, duration);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationStyles = (type) => {
    const styles = {
      success: {
        bg: "bg-green-500/20",
        border: "border-green-500/30",
        text: "text-green-300",
        icon: CheckCircle
      },
      error: {
        bg: "bg-red-500/20",
        border: "border-red-500/30",
        text: "text-red-300",
        icon: AlertCircle
      },
      warning: {
        bg: "bg-yellow-500/20",
        border: "border-yellow-500/30",
        text: "text-yellow-300",
        icon: AlertTriangle
      },
      info: {
        bg: "bg-blue-500/20",
        border: "border-blue-500/30",
        text: "text-blue-300",
        icon: Info
      }
    };
    return styles[type] || styles.info;
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className="fixed top-20 right-4 z-50 space-y-4 max-w-md">
        {notifications.map((notification) => {
          const style = getNotificationStyles(notification.type);
          const Icon = style.icon;

          return (
            <div
              key={notification.id}
              className={`${style.bg} ${style.border} backdrop-blur-xl border rounded-xl p-4 shadow-2xl 
                        animate-slideUp flex items-start gap-3`}
            >
              <Icon className={`w-5 h-5 ${style.text} flex-shrink-0 mt-0.5`} />
              <div className="flex-1">
                <h4 className={`font-semibold ${style.text} mb-1`}>{notification.title}</h4>
                <p className="text-white text-sm">{notification.message}</p>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className={`${style.text} hover:opacity-70 transition-opacity`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </NotificationContext.Provider>
  );
};
