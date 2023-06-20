import { Type } from '@sinclair/typebox';
import { Widget } from '@refocus/sdk';
import { SiLinear } from 'react-icons/si';
import { View } from './view';
import { Edit } from './edit';

const schema = Type.Object({});

const linearMyIssuesWidget: Widget<typeof schema> = {
  name: 'Linear My Issues',
  id: 'linear.my-issues',
  icon: <SiLinear />,
  schema,
  component: View,
  edit: Edit,
};

export default linearMyIssuesWidget;
