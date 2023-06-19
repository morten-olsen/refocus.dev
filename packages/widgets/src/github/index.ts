import { Widget } from '@refocus/sdk';
import githubProfileWidget from './profile/index.widget';
import pullRequest from './pull-request/index.widget';
import pullRequstComments from './pull-request-comments/index.widget';
import workflowRun from './workflow-run/index.widget';
import workflowRuns from './workflow-runs/index.widget';

const github = [
  githubProfileWidget,
  pullRequest,
  pullRequstComments,
  workflowRun,
  workflowRuns,
] satisfies Widget<any>[];

export { github };
