import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatDistance, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Alert } from 'react-native';

import Background from '~/components/Background';
import Checkin from '~/components/Checkin';

import api from '~/services/api';

import * as S from './styles';

export default function Dashboard() {
  const studentId = useSelector(state => state.auth.idUser);
  const [checkins, setCheckins] = useState([]);

  const formatDataCheckin = data => {
    return {
      id: String(data.id),
      relativeDate: formatDistance(parseISO(data.createdAt), new Date(), {
        locale: pt,
        addSuffix: true,
      }),
    };
  };

  useEffect(() => {
    const loadCheckins = async () => {
      const response = await api.get(`students/${studentId}/checkins`);

      const data = response.data.map(check => formatDataCheckin(check));

      setCheckins(data);
    };
    loadCheckins();
  }, [studentId]);

  const handleCheckin = async () => {
    try {
      const response = await api.post(`students/${studentId}/checkins`);

      const newCheckin = formatDataCheckin(response.data);

      setCheckins([...checkins, newCheckin]);

      return Alert.alert('Sucesso', 'Check-in registrado.');
    } catch (error) {
      return Alert.alert(
        'Falha na tentativa',
        'O máximo de check-ins atingidos na semana'
      );
    }
  };

  return (
    <Background>
      <S.Container>
        <S.NewButton onPress={handleCheckin}>Novo check-in</S.NewButton>

        <S.List
          data={checkins}
          keyExtrator={item => item.id}
          renderItem={({ item }) => <Checkin data={item} />}
        />
      </S.Container>
    </Background>
  );
}
