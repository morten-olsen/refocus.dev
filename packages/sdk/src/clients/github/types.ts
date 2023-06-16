import { Octokit } from 'octokit';
import { AsyncResponse } from '../../utils/types';

type PullRequest = AsyncResponse<Octokit['rest']['pulls']['get']>['data'];
type Commit = AsyncResponse<Octokit['rest']['repos']['getCommit']>['data'];
type WorkflowRun = AsyncResponse<
  Octokit['rest']['actions']['listWorkflowRuns']
>['data']['workflow_runs'][number];
type Profile = PullRequest['user'];
type Repository = PullRequest['base']['repo'];

export { PullRequest, Profile, Repository, WorkflowRun, Commit };
