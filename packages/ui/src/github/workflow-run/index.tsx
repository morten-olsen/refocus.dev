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

type WorkflowRunProps = {
  workflowRun: GithubTypes.WorkflowRun;
  onPress?: (action: GithubTypes.WorkflowRun) => void;
};

const getIcon = (workflowRun: GithubTypes.WorkflowRun) => {
  const { status, conclusion } = workflowRun;
  if (status === 'completed' && conclusion === 'success') {
    return <IoCheckmarkDoneCircleOutline size={48} color="green" />;
  } else if (status === 'completed' && conclusion === 'failure') {
    return <IoCloseCircleOutline size={48} color="red" />;
  } else if (status === 'completed' && conclusion === 'cancelled') {
    return <IoCloseCircleOutline size={48} color="yellow" />;
  } else if (status === 'completed' && conclusion === 'skipped') {
    return <IoCloseCircleOutline size={48} color="gray" />;
  } else if (status === 'completed' && conclusion === 'timed_out') {
    return <IoCloseCircleOutline size={48} color="gray" />;
  } else if (status === 'completed' && conclusion === 'action_required') {
    return <IoCloseCircleOutline size={48} color="gray" />;
  } else if (status === 'in_progress') {
    return <FiPlayCircle size={48} />;
  } else if (status === 'queued') {
    return <RxTimer size={48} />;
  } else {
    return <GoQuestion size={48} />;
  }
};

const WorkflowRun: React.FC<WorkflowRunProps> = ({ workflowRun, onPress }) => {
  const onPressHandler = useCallback(() => {
    onPress?.(workflowRun);
  }, [workflowRun, onPress]);
  return (
    <Card
      $fr
      $items="center"
      $p="md"
      $gap="md"
      onClick={onPressHandler}
      $m="sm"
    >
      <Avatar
        url={workflowRun.actor?.avatar_url}
        name={workflowRun.actor?.name || workflowRun.actor?.login}
        decal={`#${workflowRun.run_attempt}`}
      />
      <View $fc $f={1}>
        <Typography variant="overline">
          {workflowRun.repository.full_name} -{' '}
          {workflowRun.actor?.name || workflowRun.actor?.login}
        </Typography>
        <Typography variant="title">{workflowRun.display_title}</Typography>
        <Typography variant="subtitle">{workflowRun.name}</Typography>
      </View>
      <View>{getIcon(workflowRun)}</View>
    </Card>
  );
};

export { WorkflowRun };
