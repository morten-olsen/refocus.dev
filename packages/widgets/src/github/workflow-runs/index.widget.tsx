import { Widget } from '@refocus/sdk';
import { SiGithub } from 'react-icons/si';
import { schema } from './schema';
import { Edit } from './edit';
import { View } from './view';

const widget: Widget<typeof schema> = {
  name: 'Github Workflow Runs',
  description: 'Display the last 5 workflow runs',
  icon: <SiGithub />,
  id: 'github.workflow-runs',
  parseUrl: (url) => {
    if (url.hostname !== 'github.com') {
      return;
    }
    const pathParts = url.pathname.split('/').filter(Boolean);
    const [owner, repo, type, subtype] = pathParts.slice(0);
    if (type !== 'actions' || subtype) {
      return;
    }
    return { owner, repo };
  },
  schema,
  component: View,
  edit: Edit,
};

export default widget;
