import React, { useEffect, useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Alert } from 'react-native';

import Background from '~/components/Background';
import HelpOrderBox from '~/components/HelpOrderBox';

import api from '~/services/api';

import * as S from '../Dashboard/styles';

function HelpOrders({ navigation, isFocused }) {
  const [helps, setHelps] = useState([]);

  const studentId = useSelector(state => state.auth.idUser);

  const formatHelpOrderData = data => {
    return {
      ...data,
      id: String(data.id),
      relativeDate:
        data.answer_at &&
        formatRelative(parseISO(data.answer_at), new Date(), {
          locale: pt,
          addSuffix: true,
        }),
    };
  };

  useEffect(() => {
    const loadHelpOrders = async () => {
      try {
        const response = await api.get(`students/${studentId}/help-orders`);

        const dataResponse = response.data.map(help =>
          formatHelpOrderData(help)
        );

        setHelps(dataResponse);
      } catch (error) {
        Alert.alert('Erro...', 'Erro ao obter os dados de ajuda');
      }
    };

    loadHelpOrders();
  }, [studentId]);

  return (
    <Background>
      <S.Container>
        <S.NewButton onPress={() => navigation.navigate('New')}>
          Novo pedido de auxílio
        </S.NewButton>

        <S.List
          data={helps}
          keyExtrator={item => item.id}
          renderItem={({ item }) => (
            <HelpOrderBox data={item} navigation={navigation} />
          )}
        />
      </S.Container>
    </Background>
  );
}

export default withNavigationFocus(HelpOrders);
