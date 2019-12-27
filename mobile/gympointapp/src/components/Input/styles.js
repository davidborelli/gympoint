import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 15px;
  height: 46px;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 4px;

  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#DDDDDD',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #999;
`;
