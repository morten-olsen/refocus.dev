import type { Issue as IssueType } from '@linear/sdk';
import { IssueSearchResult } from '@linear/sdk/dist/_generated_documents';

type IssueProps = {
  issue: IssueType | IssueSearchResult;
};
const Issue: React.FC<IssueProps> = ({ issue }) => {
  return (
    <div>
      <h3 className="text-lg font-bold">{issue.title}</h3>
      {issue.description}
    </div>
  );
};

export { Issue };
