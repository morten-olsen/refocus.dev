import { useCallback } from 'react';
import { GithubTypes } from '@refocus/sdk';
import {
  IoCheckmarkDoneCircleOutline,
  IoCloseCircleOutline,
} from 'react-icons/io5';
import { RxTimer } from 'react-icons/rx';
import { FiPlayCircle } from 'react-icons/fi';
import { GoQuestion } from 'react-icons/go';
import { Avatar, Card, View } from '../../base';
import { Typography } from '../../typography';

type ActionProps = {
  action: GithubTypes.WorkflowRun;
  onPress?: (action: GithubTypes.WorkflowRun) => void;
};

const getIcon = (status: string | null) => {
  switch (status) {
    case 'success':
      return <IoCheckmarkDoneCircleOutline size={48} color="green" />;
    case 'failure':
      return <IoCloseCircleOutline size={48} color="red" />;
    case 'in_progress':
      return <FiPlayCircle size={48} />;
    case 'queued':
      return <RxTimer size={48} />;
    default:
      return <GoQuestion size={48} />;
  }
};

const Action: React.FC<ActionProps> = ({ action, onPress }) => {
  const onPressHandler = useCallback(() => {
    onPress?.(action);
  }, [action, onPress]);
  return (
    <Card $fr $items="center" $p="md" $gap="md" onClick={onPressHandler}>
      <Avatar
        url={action.actor?.avatar_url}
        name={action.actor?.name || action.actor?.login}
        decal={`#${action.run_attempt}`}
      />
      <View $fc $f={1}>
        <Typography variant="overline">
          {action.name} - {action.actor?.name || action.actor?.login}
        </Typography>
        <Typography variant="title">{action.display_title}</Typography>
        <Typography variant="subtitle">{action.status}</Typography>
      </View>
      <View>{getIcon(action.status)}</View>
    </Card>
  );
};

export { Action };
