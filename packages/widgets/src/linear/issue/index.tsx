import { Widget } from '@refocus/sdk';
import { SiLinear } from 'react-icons/si';
import { schema } from './schema';
import { WidgetView } from './view';

// https://linear.app/zeronorth/issue/VOY-93/save-a-new-cp-definition

const widget: Widget<typeof schema> = {
  name: 'Linear Issue',
  description: 'Display an info card for a Linear issue',
  icon: <SiLinear />,
  id: 'linear.issue',
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
};

export default widget;
