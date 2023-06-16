import { GithubTypes } from '@refocus/sdk';
import { useCallback } from 'react';
import { Avatar, Card, View } from '../../base';
import { Typography } from '../../typography';
import { LuGithub } from 'react-icons/lu';

type ProfileProps = {
  profile: GithubTypes.Profile;
  onPress?: (profile: GithubTypes.Profile) => void;
};

const Profile: React.FC<ProfileProps> = ({ profile, onPress }) => {
  const onPressHandler = useCallback(() => {
    onPress?.(profile);
  }, [onPress, profile]);
  return (
    <Card $fr $items="center" $gap="md" $p="md" onClick={onPressHandler}>
      <Avatar
        decal={<LuGithub />}
        url={profile.avatar_url}
        name={profile.name || profile.login}
      />
      <View $fr $fc>
        <Typography variant="title">{profile.name || profile.login}</Typography>
        {profile.name && profile.name !== profile.login && (
          <Typography variant="subtitle">{profile.login}</Typography>
        )}
      </View>
    </Card>
  );
};

export { Profile };
