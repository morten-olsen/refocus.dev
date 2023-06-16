import { useCallback, useContext, useMemo, useState } from 'react';
import { LinearClientContext } from './context';
import { LinearClient } from '@linear/sdk';

const useLinear = () => {
  const context = useContext(LinearClientContext);
  if (!context) {
    throw new Error(
      'useLinearClient must be used within a LinearClientProvider',
    );
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

const useLinearQuery = <T = unknown>(
  query: (client: LinearClient) => Promise<T>,
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const [data, setData] = useState<T | null>(null);
  const { client } = useLinear();

  const fetch = useCallback(async () => {
    if (!client) {
      throw new Error('Linear client is not initialized');
    }
    try {
      setLoading(true);
      const data = await query(client);
      setData(data);
      return data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [client, query]);

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

export { useLinear, useLinearQuery };
