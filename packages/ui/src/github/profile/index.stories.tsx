import type { StoryFn, Meta } from '@storybook/react';
import { Profile } from './index';
import { GithubTypes } from '@refocus/sdk';

const meta = {
  title: 'GitHub/Profile',
  component: Profile,
} satisfies Meta<typeof Profile>;

type Story = StoryFn<typeof Profile>;

type ProfileData = Partial<GithubTypes.Profile>;

const profile: ProfileData = {
  name: 'John Doe',
  avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
  login: 'johndoe',
};

const Normal: Story = {
  args: {
    profile,
  },
} as any;

const WithoutName: Story = {
  args: {
    profile: {
      ...profile,
      name: undefined,
    } as GithubTypes.Profile,
  },
} as any;

const WithoutImage: Story = {
  args: {
    profile: {
      ...profile,
      avatar_url: undefined,
    },
  },
} as any;

export { Normal, WithoutName, WithoutImage };
export default meta;
