import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Modal = styled.Modal`
  flex: 1;
`;

export const ModalWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const ModalBody = styled.View`
  width: 280px;
  min-height: 180px;
  background-color: white;
  border-radius: 14px;
  align-items: center;
  justify-content: space-between;
`;

export const TextWrapper = styled.View`
  padding: 14px;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const Description = styled.Text``

export const ButtonsWrapper = styled.View`
  width: 100%;
`;

export const Button = styled.TouchableOpacity`
  width: 100%; 
  border-top-width: .2px; 
`;

interface ButtonTextInterface {
  agree: boolean;
};

export const ButtonText = styled.Text<ButtonTextInterface>`
  text-align: center;
  color: ${({ agree }) => agree ? 'green' : 'red'};
  padding-top: 10px;
  padding-bottom: 10px;
`;