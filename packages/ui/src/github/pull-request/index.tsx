import { useCallback } from 'react';
import { GithubTypes } from '@refocus/sdk';
import { Avatar, Card, View } from '../../base';
import { Typography } from '../../typography';

type PullRequestProps = {
  pullRequest: GithubTypes.PullRequest;
  onPress?: (oullRequest: GithubTypes.PullRequest) => void;
};

const PullRequest: React.FC<PullRequestProps> = ({ pullRequest, onPress }) => {
  const onPressHandler = useCallback(() => {
    onPress?.(pullRequest);
  }, [pullRequest, onPress]);
  return (
    <Card $fr $items="center" $p="md" $gap="md" onClick={onPressHandler}>
      <Avatar
        url={pullRequest.user.avatar_url}
        decal={pullRequest.state === 'open' ? 'open' : 'closed'}
      />
      <View $fc>
        <Typography variant="overline">
          {pullRequest.head.repo?.full_name}
          {' - '}#{pullRequest.number}
        </Typography>
        <Typography variant="title">{pullRequest.title}</Typography>
      </View>
    </Card>
  );
};

export { PullRequest };
