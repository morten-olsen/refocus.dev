import { Widget } from '@refocus/sdk';
import githubProfileWidget from './profile/index.widget';
import pullRequest from './pull-request/index.widget';
import pullRequstComments from './pull-request-comments/index.widget';

const github = [
  githubProfileWidget,
  pullRequest,
  pullRequstComments,
] satisfies Widget<any>[];

export { github };
