import { useGithubQuery, withGithub } from '@refocus/sdk';
import { Github } from '@refocus/ui';
import { useEffect } from 'react';

type GithubProfileProps = {
  username: string;
};

type QueryData = {
  username: string;
};

const GithubProfile = withGithub<GithubProfileProps>(({ username }) => {
  const user = useGithubQuery(async (client, params: QueryData) => {
    const nextUser = await client.rest.users.getByUsername({
      username: params.username,
    });
    return nextUser.data;
  });

  useEffect(() => {
    user.fetch({ username });
  }, [username]);

  if (!user.data) return null;

  return <Github.Profile profile={user.data} />;
}, Github.NotLoggedIn);

export { GithubProfile };
