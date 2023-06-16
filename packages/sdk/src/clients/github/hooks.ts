import { useCallback, useContext, useMemo, useState } from 'react';
import { GithubClientContext } from './context';
import { Octokit } from 'octokit';

const useGithub = () => {
  const context = useContext(GithubClientContext);
  if (!context) {
    throw new Error(
      'useGithubClient must be used within a GithubClientProvider',
    );
  }
  const value = useMemo(
    () => ({
      client: context.octokit,
      logout: context.logout,
      login: context.login,
    }),
    [context.octokit, context.logout, context.login],
  );

  return value;
};

const useGithubQuery = <P, T = unknown>(
  query: (client: Octokit, params: P) => Promise<T>,
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const [data, setData] = useState<T>();
  const { client } = useGithub();

  const fetch = useCallback(
    async (params: P) => {
      if (!client) {
        throw new Error('Github client is not initialized');
      }
      try {
        setLoading(true);
        const data = await query(client, params);
        setData(data);
        return data;
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [client, query],
  );

  const value = useMemo(
    () => ({
      loading,
      error,
      data,
      fetch,
    }),
    [loading, error, data, fetch],
  );

  return value;
};

export { useGithub, useGithubQuery };
