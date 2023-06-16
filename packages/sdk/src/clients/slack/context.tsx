import { createContext, useCallback, useMemo, useState } from 'react';
import { SlackClient } from './client';

type SlackLogin = React.ComponentType<{
  setToken: (token: string) => void;
  cancel: () => void;
}>;

type SlackClientContextValue = {
  client?: SlackClient;
  logout: () => void;
  login: () => void;
};

type SlackClientProviderProps = {
  children: React.ReactNode;
  login: SlackLogin;
};

const SlackClientContext = createContext<SlackClientContextValue | null>(null);

const SlackClientProvider: React.FC<SlackClientProviderProps> = ({
  children,
  login: SlackLoginComponent,
}) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('slack_token') || '');
  const client = useMemo(() => {
    if (!token) {
      return;
    }

    localStorage.setItem('slack_token', token);
    return new SlackClient(token);
  }, [token]);

  const logout = useCallback(() => {
    setToken('');
    localStorage.removeItem('slack_token');
  }, [setToken]);

  const login = useCallback(() => {
    setIsLoggingIn(true);
  }, [setIsLoggingIn]);

  const onLogin = useCallback(
    (nextToken: string) => {
      setToken(nextToken);
      setIsLoggingIn(false);
    },
    [setToken, setIsLoggingIn],
  );

  const cancelLogin = useCallback(() => {
    setIsLoggingIn(false);
  }, [setIsLoggingIn]);

  return (
    <SlackClientContext.Provider value={{ client, login, logout }}>
      {isLoggingIn && (
        <SlackLoginComponent setToken={onLogin} cancel={cancelLogin} />
      )}
      {children}
    </SlackClientContext.Provider>
  );
};

export type { SlackLogin };
export { SlackClientContext, SlackClientProvider };
