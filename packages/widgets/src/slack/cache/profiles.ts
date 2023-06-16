import { SlackClient, SlackTypes } from '@refocus/sdk';

type CacheEntry = {
  promise: Promise<SlackTypes.Profile | undefined>;
};

class ProfileCache {
  #entries: Record<string, CacheEntry> = {};

  public get = async (id: string, client: SlackClient) => {
    if (!this.#entries[id]) {
      this.#entries[id] = {
        promise: client
          .send('users.info', {
            user: id,
          })
          .then((data) => {
            return data.user;
          }),
      };
    }
    return this.#entries[id].promise;
  };
}

const profileCache = new ProfileCache();

export { profileCache };
