import styled from 'styled-components';
import { View } from '../view';
import { Typography } from '../../typography';

type RootProps = React.ComponentProps<typeof View> & {
  children: React.ReactNode;
};

const Root: React.FC<RootProps> = ({ children, ...props }) => (
  <View $fc $gap="sm" {...props}>
    {children}
  </View>
);

type FieldProps = React.ComponentProps<typeof View> & {
  label: string;
  children: React.ReactNode;
};

const Label = styled(Typography)`
  font-weight: bold;
`;

const FieldWrapper = styled(View)``;

const Field: React.FC<FieldProps> = ({ label, children, ...props }) => (
  <FieldWrapper {...props} $fc>
    <Label as="label" variant="overline">
      {label}
    </Label>
    {children}
  </FieldWrapper>
);

const Input = styled.input`
  all: unset;
  display: block;
  border-radius: 4px;
  padding: 8px 12px;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.bg.highlight100};

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.bg.highlight};
  }
`;

const Buttons = styled(View)`
  display: flex;
  justify-content: flex-end;
  border-radius: 4px;
  overflow: hidden;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.bg.highlight100};
`;

const Form = Object.assign(Root, {
  Field,
  Input,
  Buttons,
});

export { Form };
