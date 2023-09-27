import styled from 'styled-components/native';

export const Wrapper = styled.View`
  width: 100px;
  align-items: center;
`;

interface ImageInterface {
  rotate: boolean;
};

export const Image = styled.Image<ImageInterface>`
  width: 100px;
  height: 100px;
  transform: ${({ rotate }) => rotate ? 'scaleX(-1)' : ''};
`;

interface IdentifierInterface {
  isUser: boolean;
};

export const Identifier = styled.Text<IdentifierInterface>`
  color: ${({ isUser }) => isUser ? 'green' : 'red'};
`;

export const HealthBar = styled.Text`
  color: white;
`;