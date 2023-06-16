import type { StoryFn, Meta } from '@storybook/react';
import { Message } from './index';

const meta = {
  title: 'Chat/Message',
  component: Message,
} satisfies Meta<typeof Message>;

type Story = StoryFn<typeof Message>;

const Normal: Story = {
  args: {
    message: {
      text: 'Hello World',
      timestamp: new Date('2023-01-01T00:00:00.000Z'),
      sender: {
        avatar: 'https://avatars.githubusercontent.com/u/10047061?v=4',
        name: 'John Doe',
      },
    },
    onPress: () => {},
  },
} as any;

export { Normal };
export default meta;
