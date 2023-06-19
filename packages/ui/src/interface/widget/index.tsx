import styled, { useTheme } from 'styled-components';
import {
  WidgetEditor,
  WidgetProvider,
  WidgetView,
  useHasUpdate,
  useName,
  useReloadWidget,
  useWidget,
  useIsUpdating,
} from '@refocus/sdk';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { motion } from 'framer-motion';
import { VscTrash } from 'react-icons/vsc';
import { CgMoreO, CgSync } from 'react-icons/cg';
import { GoScreenFull } from 'react-icons/go';
import { Dialog, View } from '../../base';
import { DropdownMenu } from '../../base';
import { useCallback, useMemo, useState } from 'react';
import { Typography } from '../../typography';
import { NotificationView } from './notification';

type WidgetProps = {
  id: string;
  data: any;
  setData?: (data: any) => void;
  className?: string;
  onRemove?: () => void;
};

const Wrapper = styled(View)`
  background: ${({ theme }) => theme.colors.bg.base};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.bg.highlight};
  margin: 5px;
  border-radius: 5px;
`;

const WidgetWrapper = styled(View)`
  flex-grow: 0;
  overflow: hidden;
  flex: 1;
  max-height: 500px;
  overflow-y: auto;
`;

const Spacer = styled(View)`
  flex: 1;
`;

const SingleLine = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title: React.FC = () => {
  const [name] = useName();
  return <SingleLine variant="overline">{name}</SingleLine>;
};

const Update: React.FC = () => {
  const hasUpdate = useHasUpdate();
  const reload = useReloadWidget();
  const updating = useIsUpdating();

  if (!hasUpdate) {
    return null;
  }

  return (
    <motion.div
      animate={{ rotate: updating ? 360 : 0 }}
      transition={{ duration: 1, loop: Infinity }}
    >
      <View $p="sm" onClick={reload}>
        <CgSync />
      </View>
    </motion.div>
  );
};

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
      <View $fr $items="center">
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
        <Title />
        <Spacer />
        <NotificationView />
        <Update />
        <Dialog>
          <Dialog.Trigger>
            <View $p="sm">
              <GoScreenFull />
            </View>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content maxWidth="90vw" height="90vh">
              <Dialog.CloseButton />
              <WidgetView />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
        {hasMenu && (
          <DropdownMenu>
            <DropdownMenu.Trigger>
              <View $p="sm">
                <CgMoreO />
              </View>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <>
                <DropdownMenu.Overlay />
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
              </>
            </DropdownMenu.Portal>
          </DropdownMenu>
        )}
      </View>
      <motion.div
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
      >
        <Wrapper className={className} $fr>
          <WidgetWrapper $f={1}>
            <WidgetView />
          </WidgetWrapper>
        </Wrapper>
      </motion.div>
      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Title>Edit Widget</Dialog.Title>
            <Dialog.Description>
              <WidgetEditor onSave={onSave} />
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </WidgetProvider>
  );
};

export { Widget };
