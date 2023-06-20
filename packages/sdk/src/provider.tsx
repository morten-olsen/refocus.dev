import { TSchema } from '@sinclair/typebox';
import {
  ClientProvider,
  GithubLogin,
  LinearLogin,
  SlackLogin,
} from './clients';
import { Widget, WidgetsProvider } from './widgets';
import { NotificationsProvider, Notification } from './notifications';
import { BoardsLoad, BoardsProvider, BoardsSave } from './boards';

type DashboardProviderProps = {
  children: React.ReactNode;
  widgets?: Widget<TSchema>[];
  load: BoardsLoad;
  save: BoardsSave;
  onNotificationsUpdate?: (notifications: Notification[]) => void;
  logins: {
    github: GithubLogin;
    linear: LinearLogin;
    slack: SlackLogin;
  };
};

const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
  widgets,
  load,
  save,
  logins,
  onNotificationsUpdate,
}) => (
  <WidgetsProvider widgets={widgets}>
    <BoardsProvider load={load} save={save}>
      <NotificationsProvider onNotificationsUpdate={onNotificationsUpdate}>
        <ClientProvider logins={logins}>{children}</ClientProvider>
      </NotificationsProvider>
    </BoardsProvider>
  </WidgetsProvider>
);

export { DashboardProvider };
