import type { StoryFn, Meta } from '@storybook/react';
import { WorkflowRun } from './index';
import workflowRun from './data.json';

const meta = {
  title: 'GitHub/Workflow Run',
  component: WorkflowRun,
} satisfies Meta<typeof WorkflowRun>;

type Story = StoryFn<typeof WorkflowRun>;

const Normal: Story = {
  args: {
    workflowRun,
    onPress: () => {},
  },
} as any;

export { Normal };
export default meta;
