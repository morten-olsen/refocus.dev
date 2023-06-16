import { styled } from 'styled-components';
import { View } from '../view';

type ButtonProps = {
  title: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
};

const ButtonWrapper = styled(View)`
  background-color: ${({ theme }) => theme.colors.bg.highlight};
  display: inline-flex;
`;

const Button: React.FC<ButtonProps> = ({ title, onClick, icon }) => {
  return (
    <ButtonWrapper
      $p="sm"
      as="button"
      onClick={onClick}
      $items="center"
      $gap="sm"
    >
      {icon}
      {title}
    </ButtonWrapper>
  );
};

export { Button };
