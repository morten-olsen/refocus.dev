import styled from 'styled-components';
import { LuLoader2 } from 'react-icons/lu';

type LoaderProps = {
  children?: React.ReactNode;
};

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const LoaderIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid #ccc;
  border-top-color: #000;
  animation: spin 1s infinite linear;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Loader: React.FC<LoaderProps> = ({ children }) => {
  return (
    <LoaderWrapper>
      <LoaderIcon>{children || <LuLoader2 />}</LoaderIcon>
    </LoaderWrapper>
  );
};

export { Loader };
