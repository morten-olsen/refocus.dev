import { useCallback, useContext, useMemo, useState } from 'react';
import { SlackClientContext } from './context';
import { SlackClient } from './client';

const useSlack = () => {
  const context = useContext(SlackClientContext);
  if (!context) {
    throw new Error('useSlack must be used within a SlackClientProvider');
  }
  const value = useMemo(
    () => ({
      client: context.client,
      logout: context.logout,
      login: context.login,
    }),
    [context.client, context.logout, context.login],
  );

  return value;
};

const useSlackQuery = <P, T = unknown>(
  query: (client: SlackClient, params: P) => Promise<T>,
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const [data, setData] = useState<T | null>(null);
  const { client } = useSlack();

  const fetch = useCallback(
    async (params: P) => {
      if (!client) {
        throw new Error('Slack client is not initialized');
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

export { useSlack, useSlackQuery };
