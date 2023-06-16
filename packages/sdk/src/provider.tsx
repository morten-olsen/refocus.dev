import { TSchema } from '@sinclair/typebox';
import {
  ClientProvider,
  GithubLogin,
  LinearLogin,
  SlackLogin,
} from './clients';
import { Widget, WidgetsProvider } from './widgets';
import { NotificationsProvider } from './notifications';
import { BoardsLoad, BoardsProvider, BoardsSave } from './boards';

type DashboardProviderProps = {
  children: React.ReactNode;
  widgets?: Widget<TSchema>[];
  load: BoardsLoad;
  save: BoardsSave;
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
}) => (
  <WidgetsProvider widgets={widgets}>
    <BoardsProvider load={load} save={save}>
      <NotificationsProvider>
        <ClientProvider logins={logins}>{children}</ClientProvider>
      </NotificationsProvider>
    </BoardsProvider>
  </WidgetsProvider>
);

export { DashboardProvider };
