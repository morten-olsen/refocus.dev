import { Avatar, Popover, Typography, View } from '@refocus/ui';
import { useProfile } from '../../hooks';
import { styled } from 'styled-components';
import { useState } from 'react';

const Wrapper = styled(View)`
  align-items: center;
  gap: 0.5rem;
`;

const Trigger = styled(Popover.Trigger)`
  display: inline-block;
  color: ${({ theme }) => theme.colors.bg.highlight};
`;

const User: React.FC<{ id: string }> = ({ id }) => {
  const profile = useProfile(id);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <Trigger>
          <Typography onClick={() => setOpen(true)}>
            {profile?.real_name || profile?.name}
          </Typography>
        </Trigger>
        <Popover.Portal>
          <>
            <Popover.Overlay />
            <Popover.Content>
              <Wrapper $fr $gap="sm">
                <Avatar
                  url={profile?.profile?.image_192}
                  name={profile?.real_name || profile?.name}
                />
                <View $fc>
                  <Typography>{profile?.real_name || profile?.name}</Typography>
                  <Typography variant="tiny">
                    {profile?.profile?.status_text}
                  </Typography>
                </View>
              </Wrapper>
            </Popover.Content>
          </>
        </Popover.Portal>
      </Popover>
    </>
  );
};

export { User };
