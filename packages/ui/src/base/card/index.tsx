import styled from 'styled-components';
import { View } from '../view';

const Card = styled(View)`
  border-radius: ${({ theme }) => `${theme.radii.md}${theme.units.radii}`};

  ${({ theme, ...rest }) =>
    'onClick' in rest &&
    `
    cursor: pointer;
    transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    &:hover {
      box-shadow: 0 0 5px 2px ${theme.colors.bg.highlight};
      background: ${theme.colors.bg.highlight100};
    }

    &:active {
      box-shadow: 0 0 3px 2px ${theme.colors.bg.highlight100};
      background: ${theme.colors.bg.highlight100};
    }
  `}
`;

export { Card };
