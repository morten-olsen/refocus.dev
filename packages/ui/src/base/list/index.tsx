import { View } from '../view';

type ListProps = {
  children: React.ReactNode;
};

const List = ({ children }: ListProps) => {
  return (
    <View $fc $gap="sm" $p="sm">
      {children}
    </View>
  );
};

export { List };
