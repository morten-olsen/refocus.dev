import type { StoryFn, Meta } from '@storybook/react';
import { Action } from './index';
import action from './data.json';

const meta = {
  title: 'GitHub/Action',
  component: Action,
} satisfies Meta<typeof Action>;

type Story = StoryFn<typeof Action>;

const Normal: Story = {
  args: {
    action: action,
    onPress: () => {},
  },
} as any;

export { Normal };
export default meta;
