import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView`
  background: #f5f5f5;
  flex: 1;
  margin: 0 25px;
`;

export const QuestionText = styled.TextInput.attrs({
  multiline: true,
  placeholder: 'Inclua seu pedido de auxílio',
})`
  background: #fff;
  margin: 25px 0;
  border-radius: 4px;
  height: 350px;
  padding: 20px;
  border: 1px solid #dddddd;
  font-size: 20px;
  color: #666;
`;

export const SubmitButton = styled(Button)``;
