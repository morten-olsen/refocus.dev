import { Widget } from '@refocus/sdk';
import { SiLinear } from 'react-icons/si';
import { schema } from './schema';
import { WidgetView } from './view';
import { Edit } from './edit';

// https://linear.app/zeronorth/issue/VOY-93/save-a-new-cp-definition

const widget: Widget<typeof schema> = {
  name: 'Linear Issue Comments',
  description: 'Display the 5 latest comments on a Linear issue',
  icon: <SiLinear />,
  id: 'linear.issue-comments',
  parseUrl: (url) => {
    if (url.hostname !== 'linear.app') {
      return;
    }
    const pathParts = url.pathname.split('/').filter(Boolean);
    const [, type, id] = pathParts.slice(0);
    if (type !== 'issue' || !id) {
      return;
    }
    return { id };
  },
  schema,
  component: WidgetView,
  edit: Edit,
};

export default widget;
