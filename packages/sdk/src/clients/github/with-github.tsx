import { useGithub } from '.';

const withGithub = <TProps extends object>(
  Component: React.ComponentType<TProps>,
  Fallback: React.ComponentType<object>,
) => {
  const WrappedComponent: React.FC<TProps> = (props) => {
    const github = useGithub();

    if (!github.client) {
      return <Fallback />;
    }
    return <Component {...props} />;
  };

  return WrappedComponent;
};

export { withGithub };
