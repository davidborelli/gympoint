import React, { useEffect, useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import { formatDistance, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import Checkin from '~/components/Checkin';

import api from '~/services/api';

import * as S from './styles';

function Dashboard() {
  const studentId = useSelector(state => state.auth.idUser);
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    const loadCheckins = async () => {
      const response = await api.get(`students/${studentId}/checkins`);

      const data = response.data.map(check => ({
        id: String(check.id),
        relativeDate: formatDistance(parseISO(check.createdAt), new Date(), {
          locale: pt,
          addSuffix: true,
        }),
      }));

      setCheckins(data);
    };
    loadCheckins();
  }, [studentId]);

  return (
    <Background>
      <S.Container>
        <S.NewButton>Novo check-in</S.NewButton>

        <S.List
          data={checkins}
          keyExtrator={item => item.id}
          renderItem={({ item }) => <Checkin data={item} />}
        />
      </S.Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="add-location" size={20} color={tintColor} />
  ),
};
export default withNavigationFocus(Dashboard);
