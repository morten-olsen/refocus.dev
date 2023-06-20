import styled from 'styled-components';
import { useMemo } from 'react';

type AvatarProps = {
  url?: string;
  name?: string;
  decal?: React.ReactNode;
  size?: keyof typeof sizes;
};

const sizes = {
  xs: 20,
  sm: 28,
  md: 50,
  lg: 75,
};

const fontSizes = {
  xs: 8,
  sm: 10,
  md: 24,
  lg: 32,
};

const Wrapper = styled.div<{
  size: AvatarProps['size'];
}>`
  position: relative;
  flex-shrink: 0;
  ${({ size }) => (size ? `width: ${sizes[size]}px;` : '')}
  ${({ size }) => (size ? `height: ${sizes[size]}px;` : '')}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border: 3px solid ${({ theme }) => theme.colors.text.base};
  border-radius: 50%;
`;

const WithoutImage = styled.div<{
  size: AvatarProps['size'];
}>`
  width: 100%;
  height: 100%;
  border: 3px solid ${({ theme }) => theme.colors.text.base};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  font-weight: bold;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.base};
  ${({ size }) => (size ? `font-size: ${fontSizes[size]}px;` : '')}
`;

const Decal = styled.div`
  position: absolute;
  bottom: 0;
  right: -5px;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  padding: 0 5px;
  background-color: ${({ theme }) => theme.colors.text.base};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.bg.base};
  font-size: 12px;
`;

const Avatar: React.FC<AvatarProps> = ({ url, name, decal, size = 'md' }) => {
  const initials = useMemo(() => {
    const [firstName, lastName] = name?.split(' ') || [];
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`;
  }, [name]);
  return (
    <Wrapper size={size}>
      {!url && <WithoutImage size={size}>{initials}</WithoutImage>}
      {url && <Image src={url} alt={name || ''} />}
      {decal && <Decal>{decal}</Decal>}
    </Wrapper>
  );
};

export { Avatar };
