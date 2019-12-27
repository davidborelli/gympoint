import styled from 'styled-components/native';

export const Container = styled.SafeAreaView``;

export const BoxInfo = styled.View`
  margin-bottom: 12px;
  padding: 20px;
  border-radius: 4px;
  background: #ffffff;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dddddd;
`;

export const BoxTitle = styled.Text`
  font-weight: bold;
  color: #444444;
`;

export const BoxDate = styled.Text`
  font-size: 14px;
  color: #666666;
`;
