import { GithubProfile } from '.';
import { Widget } from '@refocus/sdk';
import { schema } from './schema';
import { Editor } from './editor';

const githubProfileWidget: Widget<typeof schema> = {
  name: 'Github Profile',
  id: 'github.profile',
  schema,
  component: GithubProfile,
  edit: Editor,
};

export default githubProfileWidget;
