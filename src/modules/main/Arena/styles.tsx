import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Bar } from 'react-native-progress';

export const Wrapper = styled.View`
  flex: 1;
  width: 100%;
  height: ${Dimensions.get('screen').height}px;
  align-items: center;
`;

export const Title = styled.Text`
  padding: 40px;
  font-size: 18px;
  font-weight: 600;
`;

export const ArrackButtonWrapper = styled.View`
  margin-top: 50px;
`;

export const AttackButton = styled.TouchableOpacity`
  opacity: ${(props) => props.disabled ? .3 : 1};
`;

export const Attack = styled.Text`
  height: 30px;
  font-size: 16px;
  font-weight: 600;
  color: red;
`;

export const arenaSize: number = Dimensions.get('screen').width > 500 ? 500 : Dimensions.get('screen').width;

export const ImageBackground = styled.ImageBackground`
  width: ${arenaSize}px;
  height: ${arenaSize}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

export const StatusBarWrapper = styled.View`
  width: 100%;
  height: 24px;
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 40px;
  margin-top: 20px;
`;

export const HealthBarWrapper = styled.View``;

export const HealthBarTitle = styled.Text`
  font-size: 12px;
  padding-bottom: 4px;
`;

export const ProgressBar = styled(Bar)``;

export const LoaderBackground = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: .3;  
`;

export const LoaderWrapper = styled.View`
  position: absolute;
  width: 100%;
`;