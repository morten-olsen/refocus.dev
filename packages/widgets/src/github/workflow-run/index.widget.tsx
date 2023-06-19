import { Widget } from '@refocus/sdk';
import { SiGithub } from 'react-icons/si';
import { schema } from './schema';
import { Edit } from './edit';
import { View } from './view';

const widget: Widget<typeof schema> = {
  name: 'Github Workflow Run',
  description: 'Display information about a specific workflow run.',
  icon: <SiGithub />,
  id: 'github.workflow-run',
  parseUrl: (url) => {
    if (url.hostname !== 'github.com') {
      return;
    }
    const pathParts = url.pathname.split('/').filter(Boolean);
    const [owner, repo, type, subtype, id] = pathParts.slice(0);
    if (type !== 'actions' || subtype !== 'runs' || !id) {
      return;
    }
    return { owner, repo, id: parseInt(id, 10) };
  },
  schema,
  component: View,
  edit: Edit,
};

export default widget;
