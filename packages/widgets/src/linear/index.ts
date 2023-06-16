import { Widget } from '@refocus/sdk';
import linearMyIssuesWidget from './my-issues/index.widget';
import linearIssue from './issue';
import linearIssueWithComments from './issue-with-comments';

const linear = [
  linearMyIssuesWidget,
  linearIssue,
  linearIssueWithComments,
] satisfies Widget<any>[];

export { linear };
