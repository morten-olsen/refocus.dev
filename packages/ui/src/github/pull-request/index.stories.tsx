import type { StoryFn, Meta } from '@storybook/react';
import { PullRequest } from './index';
import pullRequest from './data.json';

const meta = {
  title: 'GitHub/Pull Request',
  component: PullRequest,
} satisfies Meta<typeof PullRequest>;

type Story = StoryFn<typeof PullRequest>;

const Normal: Story = {
  args: {
    pullRequest: pullRequest,
    onPress: () => {},
  },
} as any;

export { Normal };
export default meta;
