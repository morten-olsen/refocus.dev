import { useLinear } from '.';

const withLinear = <TProps extends object>(
  Component: React.ComponentType<TProps>,
  FallBack: React.ComponentType<object>,
) => {
  const WrappedComponent: React.FC<TProps> = (props) => {
    const linear = useLinear();

    if (!linear.client) {
      return <FallBack />;
    }
    return <Component {...props} />;
  };

  return WrappedComponent;
};

export { withLinear };
