import { Widget } from '@refocus/sdk';
import { schema } from './schema';
import { WidgetView } from './view';
import { SiSlack } from 'react-icons/si';

// https://refocus.slack.com/archives/D05C97E7GB1I

const widget: Widget<typeof schema> = {
  name: 'Slack Conversation',
  description: 'Display the 5 latest messages of a Slack conversation',
  id: 'slack.conversation',
  icon: <SiSlack />,
  parseUrl: (url) => {
    if (url.hostname !== '0north.slack.com') {
      return;
    }
    const pathParts = url.pathname.split('/').filter(Boolean);
    const [type, id] = pathParts.slice(0);
    if (type !== 'archives' || !id) {
      return;
    }
    return { conversationId: id };
  },
  schema,
  component: WidgetView,
};

export default widget;
