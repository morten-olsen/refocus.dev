import styled, { useTheme } from 'styled-components';
import {
  WidgetEditor,
  WidgetProvider,
  WidgetView,
  useWidget,
} from '@refocus/sdk';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { motion } from 'framer-motion';
import { VscTrash } from 'react-icons/vsc';
import { CgMoreO } from 'react-icons/cg';
import { Dialog, View } from '../../base';
import { DropdownMenu } from '../../base';
import { useCallback, useMemo, useState } from 'react';

type WidgetProps = {
  id: string;
  data: any;
  setData?: (data: any) => void;
  className?: string;
  onRemove?: () => void;
};

const Wrapper = styled(View)`
  background: ${({ theme }) => theme.colors.bg.base};
`;

const WidgetWrapper = styled(View)`
  flex-grow: 0;
  overflow: hidden;
  flex: 1;
`;

const Spacer = styled(View)`
  flex: 1;
`;

const Widget: React.FC<WidgetProps> = ({
  id,
  data,
  setData,
  className,
  onRemove,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const widget = useWidget(id);
  const hasMenu = useMemo(
    () => !!(widget?.edit && setData) || onRemove,
    [widget, onRemove, setData],
  );
  const onSave = useCallback(
    (nextData: any) => {
      setData?.(nextData);
      setShowEdit(false);
    },
    [setData],
  );
  return (
    <WidgetProvider id={id} data={data} setData={setData}>
      <View $fr>
        <motion.div animate={{ rotate: open ? 180 : 0 }}>
          <View
            $items="center"
            $justify="center"
            $fc
            $p="sm"
            onClick={() => setOpen(!open)}
          >
            <MdKeyboardArrowUp size={22} />
          </View>
        </motion.div>
        <Spacer />
        {hasMenu && (
          <DropdownMenu>
            <DropdownMenu.Trigger>
              <View $p="sm">
                <CgMoreO />
              </View>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content alignOffset={50}>
                {!!onRemove && (
                  <DropdownMenu.Item onClick={onRemove}>
                    <DropdownMenu.Icon>
                      <VscTrash color={theme?.colors.simple.red} />
                    </DropdownMenu.Icon>
                    Remove
                  </DropdownMenu.Item>
                )}
                {!!widget?.edit && !!setData && (
                  <DropdownMenu.Item onClick={() => setShowEdit(true)}>
                    Edit
                  </DropdownMenu.Item>
                )}
                <DropdownMenu.Arrow />
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu>
        )}
      </View>
      <motion.div animate={{ height: open ? 'auto' : 0 }}>
        <Wrapper className={className} $fr>
          <WidgetWrapper $f={1}>
            <WidgetView />
          </WidgetWrapper>
        </Wrapper>
      </motion.div>
      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Edit Widget</Dialog.Title>
          <Dialog.Description>
            <WidgetEditor onSave={onSave} />
          </Dialog.Description>
        </Dialog.Content>
      </Dialog>
    </WidgetProvider>
  );
};

export { Widget };
