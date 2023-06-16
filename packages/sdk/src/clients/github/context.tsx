import { createContext, useCallback, useMemo, useState } from 'react';
import { Octokit } from 'octokit';

type GithubLogin = React.ComponentType<{
  setToken: (token: string) => void;
  cancel: () => void;
}>;

type GithubClientContextValue = {
  octokit?: Octokit;
  login?: () => void;
  logout: () => void;
};

type GithubClientProviderProps = {
  children: React.ReactNode;
  login: GithubLogin;
};

const GithubClientContext = createContext<GithubClientContextValue | null>(
  null,
);

const GithubClientProvider: React.FC<GithubClientProviderProps> = ({
  children,
  login: GithubLoginComponent,
}) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [pat, setPat] = useState(localStorage.getItem('github_pat') || '');
  const octokit = useMemo(() => {
    if (!pat) {
      return;
    }

    localStorage.setItem('github_pat', pat);
    return new Octokit({ auth: pat });
  }, [pat]);

  const logout = useCallback(() => {
    setPat('');
    localStorage.removeItem('github_pat');
  }, [setPat]);

  const login = useCallback(() => {
    setIsLoggingIn(true);
  }, [setIsLoggingIn]);

  const onLogin = useCallback(
    (nextPat: string) => {
      setPat(nextPat);
      setIsLoggingIn(false);
    },
    [setPat, setIsLoggingIn],
  );

  const cancelLogin = useCallback(() => {
    setIsLoggingIn(false);
  }, [setIsLoggingIn]);

  return (
    <GithubClientContext.Provider value={{ octokit, logout, login }}>
      {isLoggingIn && (
        <GithubLoginComponent cancel={cancelLogin} setToken={onLogin} />
      )}
      {children}
    </GithubClientContext.Provider>
  );
};

export type { GithubLogin };
export { GithubClientContext, GithubClientProvider };
