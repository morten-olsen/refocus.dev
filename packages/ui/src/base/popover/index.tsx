import * as PopoverPrimitives from '@radix-ui/react-popover';
import { motion } from 'framer-motion';
import { styled, css } from 'styled-components';

const content = css`
  min-width: 220px;
  background: ${({ theme }) => theme.colors.bg.base100};
  border-radius: 6px;
  padding: 5px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`;

const Root = styled(PopoverPrimitives.Root)``;

const Content = styled(PopoverPrimitives.Content)`
  ${content}
`;

const Trigger = styled(PopoverPrimitives.Trigger)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Portal = styled(PopoverPrimitives.Portal)``;

const OverlayComponent = styled(motion.div)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
`;

const Overlay: React.FC = () => (
  <OverlayComponent initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
);

const Arrow = styled(PopoverPrimitives.Arrow)`
  fill: ${({ theme }) => theme.colors.bg.base100};
`;

const Popover = Object.assign(Root, {
  Root,
  Content,
  Trigger,
  Portal,
  Overlay,
  Arrow,
});

export { Popover };
