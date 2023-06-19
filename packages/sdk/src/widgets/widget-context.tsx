import { createContext, useCallback, useMemo, useRef, useState } from 'react';
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
  addUpdater: (updater: Updater) => () => void;
  updating: boolean;
  hasUpdater: boolean;
  name: string;
  setName: (name: string) => void;
  updateWidget: () => Promise<void>;
};

type Updater = () => Promise<void> | void;

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
  const [updating, setUpdating] = useState(false);
  const [name, setName] = useState('');
  const [updaters, setUpdaters] = useState<Updater[]>([]);
  const globalNotifications = useNotifications();
  const addGlobalNotification = useNotificationAdd();
  const dissmissGlobalNotification = useNotificationDismiss();
  const notifications = useMemo(() => {
    return globalNotifications.filter((n) => n.view === ref.current);
  }, [globalNotifications]);

  const addNotification = useCallback(
    (notification: Notification) => {
      addGlobalNotification({ ...notification, view: ref.current });
    },
    [addGlobalNotification],
  );

  const addUpdater = useCallback(
    (updater: Updater) => {
      setUpdaters((prev) => [...prev, updater]);
      return () => {
        setUpdaters((prev) => prev.filter((u) => u !== updater));
      };
    },
    [setUpdaters],
  );

  const dismissNotification = useCallback(
    (dismissId: string) => {
      dissmissGlobalNotification(dismissId);
    },
    [dissmissGlobalNotification],
  );

  const updateWidget = useCallback(async () => {
    setUpdating(true);
    for (const updater of updaters) {
      try {
        await updater();
      } catch (e) {
        console.error(e);
      }
    }
    setUpdating(false);
  }, [updaters]);

  const value = useMemo(
    () => ({
      addNotification,
      dismissNotification,
      notifications,
      id,
      data,
      setData,
      name,
      setName,
      addUpdater,
      updateWidget,
      updating,
      hasUpdater: updaters.length > 0,
    }),
    [
      addNotification,
      notifications,
      id,
      data,
      setData,
      updating,
      dismissNotification,
      name,
      setName,
      addUpdater,
      updateWidget,
      updaters.length,
    ],
  );

  return (
    <WidgetContext.Provider value={value}>{children}</WidgetContext.Provider>
  );
};

export { WidgetContext, WidgetProvider };
