import { Widget } from '@refocus/sdk';
import { SiGithub } from 'react-icons/si';
import { schema } from './schema';
import { Edit } from './edit';
import { View } from './view';

const widget: Widget<typeof schema> = {
  name: 'Github File',
  description: 'Display a file from a Github repository',
  icon: <SiGithub />,
  id: 'github.file',
  parseUrl: (url) => {
    if (url.hostname !== 'github.com') {
      return;
    }
    const pathParts = url.pathname.split('/').filter(Boolean);
    const [owner, repo, type, branch, ...filePathParts] = pathParts.slice(0);
    const path = filePathParts.join('/');
    if (type !== 'blob' || !branch || !path) {
      return;
    }
    return { owner, repo, branch, path };
  },
  schema,
  component: View,
  edit: Edit,
};

export default widget;
