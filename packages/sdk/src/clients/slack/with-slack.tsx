import { useSlack } from '.';

const withSlack = <TProps extends object>(
  Component: React.ComponentType<TProps>,
  Fallback: React.ComponentType<object>,
) => {
  const WrappedComponent: React.FC<TProps> = (props) => {
    const slack = useSlack();

    if (!slack.client) {
      return <Fallback />;
    }
    return <Component {...props} />;
  };

  return WrappedComponent;
};

export { withSlack };
