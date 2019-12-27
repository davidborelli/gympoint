import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 0 25px;
`;

export const BoxHelp = styled.View`
  display: flex;
  background: #ffffff;

  margin-top: 30px;
  padding: 30px;
  border-radius: 4px;
  border: 1px solid #dddddd;
`;

export const HeaderBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TextHeaderLeft = styled.Text`
  font-weight: bold;
  font-size: 17px;
  color: #444444;
`;

export const TextHeaderRight = styled.Text`
  font-size: 15px;
  color: #444444;
`;

export const Body = styled.Text`
  font-size: 15px;
  margin-top: 20px;
  line-height: 25px;
  color: #444444;
`;

export const Answer = styled.View`
  margin-top: 20px;
`;

export const HeaderAnswer = styled.Text`
  font-weight: bold;
  font-size: 17px;
  color: #444444;
`;

export const BodyHeader = styled.Text`
  font-size: 15px;
  margin-top: 20px;
  line-height: 25px;
  color: #444444;
`;
