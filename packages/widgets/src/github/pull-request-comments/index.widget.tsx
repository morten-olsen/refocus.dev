import { Widget } from '@refocus/sdk';
import { SiGithub } from 'react-icons/si';
import { schema } from './schema';
import { Edit } from './edit';
import { View } from './view';

const widget: Widget<typeof schema> = {
  name: 'Github Pull Request Comments',
  id: 'github.pull-request-comments',
  icon: <SiGithub />,
  description: 'Display the 5 latest comments on a Github pull request',
  parseUrl: (url) => {
    if (url.hostname !== 'github.com') {
      return;
    }
    const pathParts = url.pathname.split('/').filter(Boolean);
    const [owner, repo, type, pr] = pathParts.slice(0);
    if (type !== 'pull' || !pr) {
      return;
    }
    return { owner, repo, pr: parseInt(pr, 10) };
  },
  schema,
  component: View,
  edit: Edit,
};

export default widget;
