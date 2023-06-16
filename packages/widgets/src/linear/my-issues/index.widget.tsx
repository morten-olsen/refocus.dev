import { Type } from '@sinclair/typebox';
import { LinearMyIssues } from '.';
import { Widget } from '@refocus/sdk';

const schema = Type.Object({});

const linearMyIssuesWidget: Widget<typeof schema> = {
  name: 'Linear My Issues',
  id: 'linear.my-issues',
  schema,
  component: LinearMyIssues,
};

export default linearMyIssuesWidget;
