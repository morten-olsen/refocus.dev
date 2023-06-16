import { createContext, useCallback, useMemo, useRef } from 'react';
import {
  Notification as BaseNotification,
  useNotificationAdd,
  useNotifications,
  useNotificationDismiss,
} from '../notifications';
type Notification = Omit<BaseNotification, 'view'>;

type WidgetContextValue = {
  id: string;
  data?: any;
  addNotification: (notification: Notification) => void;
  dismissNotification: (id: string) => void;
  notifications: Notification[];
  setData?: (data: any) => void;
};

type WidgetProviderProps = {
  id: string;
  data?: any;
  setData?: (data: any) => void;
  children: React.ReactNode;
};

const WidgetContext = createContext<WidgetContextValue | null>(null);

const WidgetProvider = ({
  id,
  data,
  setData,
  children,
}: WidgetProviderProps) => {
  const ref = useRef(Symbol('WidgetRender'));
  const globalNotifications = useNotifications();
  const addGlobalNotification = useNotificationAdd();
  const dissmissGlobalNotification = useNotificationDismiss();
  const notifications = useMemo(() => {
    return globalNotifications.filter((n) => n.view !== ref.current);
  }, [globalNotifications]);

  const addNotification = useCallback(
    (notification: Notification) => {
      addGlobalNotification({ ...notification, view: ref.current });
    },
    [addGlobalNotification],
  );

  const dismissNotification = useCallback(
    (dismissId: string) => {
      dissmissGlobalNotification(dismissId);
    },
    [dissmissGlobalNotification],
  );

  const value = useMemo(
    () => ({
      addNotification,
      dismissNotification,
      notifications,
      id,
      data,
      setData,
    }),
    [addNotification, notifications, id, data, setData, dismissNotification],
  );

  return (
    <WidgetContext.Provider value={value}>{children}</WidgetContext.Provider>
  );
};

export { WidgetContext, WidgetProvider };
