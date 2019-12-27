import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 0 25px;
`;

export const Title = styled.Text``;

export const NewButton = styled(Button)`
  margin: 25px 0;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 0 },
})``;
