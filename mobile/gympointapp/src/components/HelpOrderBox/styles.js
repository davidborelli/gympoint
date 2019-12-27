import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  margin-bottom: 12px;
  padding: 20px;
  border-radius: 4px;
  background: #ffffff;

  display: flex;
  border: 1px solid #dddddd;
`;

export const BoxInfoHead = styled.View`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
`;

export const leftHead = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TextLeftHead = styled.Text`
  margin-left: 5px;
  font-weight: bold;
  font-size: 15px;
  color: ${props => (props.asked ? '#42CB59' : '#999999')};
`;

export const HourHead = styled.Text`
  color: #666666;
  font-size: 13px;
`;

export const BoxInfoBody = styled.View`
  margin-top: 15px;
`;

export const TextBody = styled.Text`
  color: #666666;
  font-size: 15px;
  line-height: 25px;
`;
