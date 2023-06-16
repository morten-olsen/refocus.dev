import { SlackTypes, useSlack } from '@refocus/sdk';
import { useEffect, useState } from 'react';
import { profileCache } from '../cache/profiles';

const useProfile = (id?: string) => {
  const { client } = useSlack();
  const [profile, setProfile] = useState<SlackTypes.Profile>();

  useEffect(() => {
    const run = async () => {
      if (!id || !client) {
        return;
      }
      const nextProfile = await profileCache.get(id, client);
      setProfile(nextProfile);
    };
    run();
  }, [id, client]);

  return profile;
};

export { useProfile };
