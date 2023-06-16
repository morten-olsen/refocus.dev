import type { Issue as IssueType } from '@linear/sdk';
import { Link } from 'react-router-dom';
import { IssueSearchResult } from '@linear/sdk/dist/_generated_documents';

type IssueProps = {
  issue: IssueType | IssueSearchResult;
};
const Issue: React.FC<IssueProps> = ({ issue }) => {
  return (
    <div>
      <Link to={`/linear/issue?id=${issue.id}`}>
        <h3 className="text-lg font-bold">{issue.title}</h3>
      </Link>
      {issue.description}
    </div>
  );
};

export { Issue };
