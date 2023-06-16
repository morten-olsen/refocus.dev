import { GithubClientProvider, GithubLogin } from './github';
import { LinearClientProvider, LinearLogin } from './linear';
import { SlackClientProvider, SlackLogin } from './slack';

type ClientProviderProps = {
  children: React.ReactNode;
  logins: {
    github: GithubLogin;
    linear: LinearLogin;
    slack: SlackLogin;
  };
};

const ClientProvider: React.FC<ClientProviderProps> = ({
  children,
  logins,
}) => {
  return (
    <LinearClientProvider login={logins.linear}>
      <GithubClientProvider login={logins.github}>
        <SlackClientProvider login={logins.slack}>
          {children}
        </SlackClientProvider>
      </GithubClientProvider>
    </LinearClientProvider>
  );
};

export { ClientProvider };
