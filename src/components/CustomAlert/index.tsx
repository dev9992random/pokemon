import React from 'react';
import * as S from './styles';

interface AlertProps {
  title: string;
  description: string;
  yesTitle: string;
  noTitle: string;
  yesOnPress: () => void;
  noOnPress: () => void;
  visible: boolean;
};

const CustomAlert: React.FC<AlertProps> = ({
  title,
  description,
  yesOnPress,
  noOnPress,
  yesTitle,
  noTitle,
  visible,
}) => {
  return (
    <S.Wrapper>
      <S.Modal
        animationType="slide"
        transparent={true}
        visible={visible}
      >
        <S.ModalWrapper>
          <S.ModalBody>
            <S.TextWrapper>
              <S.Title>{title}</S.Title>
              <S.Description>{description}</S.Description>
            </S.TextWrapper>

            <S.ButtonsWrapper>
              <S.Button onPress={yesOnPress}>
                <S.ButtonText agree={true}>{yesTitle}</S.ButtonText>
              </S.Button>
              <S.Button onPress={noOnPress}>
                <S.ButtonText>{noTitle}</S.ButtonText>
              </S.Button>
            </S.ButtonsWrapper>
          </S.ModalBody>
        </S.ModalWrapper>
      </S.Modal>
    </S.Wrapper>
  );
};

export default CustomAlert;