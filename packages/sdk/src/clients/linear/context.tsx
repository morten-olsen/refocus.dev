import { LinearClient } from '@linear/sdk';
import { createContext, useCallback, useMemo, useState } from 'react';

type LinearLogin = React.ComponentType<{
  setApiKey: (apiKey: string) => void;
  cancel: () => void;
}>;

type LinearClientContextValue = {
  client?: LinearClient;
  logout: () => void;
  login?: () => void;
};

type LinearClientProviderProps = {
  children: React.ReactNode;
  login: LinearLogin;
};

const LinearClientContext = createContext<LinearClientContextValue | null>(
  null,
);

const LinearClientProvider: React.FC<LinearClientProviderProps> = ({
  children,
  login: LinearLoginComponent,
}) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [apiKey, setApiKey] = useState(
    localStorage.getItem('linear_token') || '',
  );
  const client = useMemo(() => {
    if (!apiKey) {
      return;
    }

    localStorage.setItem('linear_token', apiKey);
    return new LinearClient({ apiKey: apiKey });
  }, [apiKey]);

  const logout = useCallback(() => {
    setApiKey('');
    localStorage.removeItem('linear_token');
  }, [setApiKey]);

  const login = useCallback(() => {
    setIsLoggingIn(true);
  }, [setIsLoggingIn]);

  const onLogin = useCallback(
    (nextApiKey: string) => {
      setApiKey(nextApiKey);
      setIsLoggingIn(false);
    },
    [setApiKey, setIsLoggingIn],
  );

  const cancelLogin = useCallback(() => {
    setIsLoggingIn(false);
  }, [setIsLoggingIn]);

  return (
    <LinearClientContext.Provider value={{ client, login, logout }}>
      {isLoggingIn && (
        <LinearLoginComponent setApiKey={onLogin} cancel={cancelLogin} />
      )}
      {children}
    </LinearClientContext.Provider>
  );
};

export type { LinearLogin };
export { LinearClientContext, LinearClientProvider };
