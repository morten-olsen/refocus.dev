import {
  useAutoUpdate,
  useGithubQuery,
  useName,
  withGithub,
} from '@refocus/sdk';
import { Props } from './schema';
import { CodeEditor, Github, View } from '@refocus/ui';
import { styled } from 'styled-components';

const FullHeight = styled(View)`
  height: 100%;
`;

const StyledCodeEditor = styled(CodeEditor)`
  height: 100%;
`;

const WidgetView = withGithub<Props>(
  ({ owner, repo, branch, path, highlight }) => {
    const [, setName] = useName();
    const { data, fetch } = useGithubQuery(async (client, params: Props) => {
      const response = await client.rest.repos.getContent({
        owner: params.owner,
        repo: params.repo,
        path: params.path,
      });
      setName(`${params.owner}/${params.repo}/${params.path}}`);
      return response.data;
    });

    useAutoUpdate(
      {
        interval: 1000 * 60 * 5,
        action: async () => fetch({ owner, repo, branch, path }),
      },
      [owner, repo, branch, path],
    );

    if (!data) {
      return null;
    }

    if (!data || !('type' in data) || data.type !== 'file') {
      return <div>Not a file</div>;
    }

    return (
      <FullHeight $fc>
        <StyledCodeEditor
          highlight={highlight}
          value={atob(data.content)}
          setValue={() => {}}
          readOnly
        />
      </FullHeight>
    );
  },
  Github.NotLoggedIn,
);

export { WidgetView as View };
