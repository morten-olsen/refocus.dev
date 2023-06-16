import { createContext, useCallback, useMemo, useState } from 'react';
import type { Notification } from './types';

type NotificationsContextValue = {
  notifications: Notification[];
  add: (notification: Notification) => void;
  dismiss: (id: string) => void;
};

type NotificationsProviderProps = {
  children: React.ReactNode;
};

const NotificationsContext = createContext<NotificationsContextValue | null>(
  null,
);

let nextId = 0;

const NotificationsProvider: React.FC<NotificationsProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const add = useCallback((notification: Notification) => {
    setNotifications((current) => [
      ...current,
      {
        id: String(nextId++),
        ...notification,
      },
    ]);
    if ('Notification' in window) {
      const notify = async () => {
        if (Notification.permission !== 'granted') {
          await Notification.requestPermission();
        }
        if (Notification.permission === 'granted') {
          const n = new Notification(notification.title || 'Notification', {
            body: notification.message,
          });
          setTimeout(() => n.close(), 10 * 1000);
        }
      };
      notify();
    }
  }, []);

  const dismiss = useCallback((id: string) => {
    setNotifications((current) => current.filter((n) => n.id !== id));
  }, []);

  const value = useMemo(
    () => ({ notifications, add, dismiss }),
    [notifications, add, dismiss],
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

export { NotificationsContext, NotificationsProvider };
