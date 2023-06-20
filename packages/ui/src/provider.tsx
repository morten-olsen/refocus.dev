import { DashboardProvider, Widget, Notification } from '@refocus/sdk';
import { UIProvider } from './theme/provider';
import { useCallback, useMemo } from 'react';
import { GithubLogin } from './github';
import { LinearLogin } from './linear';
import { SlackLogin } from './slack';

type FocusProviderProps = {
  children: React.ReactNode;
  widgets: Widget<any>[];
  onNotificationsUpdate?: (notifications: Notification[]) => void;
};

const FocusProvider: React.FC<FocusProviderProps> = ({
  children,
  widgets,
  onNotificationsUpdate,
}) => {
  const save = useCallback((data: any) => {
    localStorage.setItem('boards', JSON.stringify(data));
  }, []);

  const logins = useMemo(
    () => ({
      github: GithubLogin,
      linear: LinearLogin,
      slack: SlackLogin,
    }),
    [],
  );

  const load = useCallback(() => {
    const data = localStorage.getItem('boards');
    if (data) {
      return JSON.parse(data);
    }
    return {
      boards: {},
      selected: undefined,
    };
  }, []);

  return (
    <UIProvider>
      <DashboardProvider
        load={load}
        save={save}
        widgets={widgets}
        logins={logins}
        onNotificationsUpdate={onNotificationsUpdate}
      >
        {children}
      </DashboardProvider>
    </UIProvider>
  );
};

export { FocusProvider };
