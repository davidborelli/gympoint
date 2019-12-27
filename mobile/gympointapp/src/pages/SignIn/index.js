import React, { useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Background from '~/components/Background';

import logo from '~/assets/logosplash.png';
import { signInRequest } from '~/store/modules/auth/actions';

import * as S from './styles';

export default function SignIn() {
  const dispatch = useDispatch();

  const [idUser, setIdUser] = useState('');

  const loading = useSelector(state => state.auth.loading);

  const handleSubmit = () => {
    dispatch(signInRequest(idUser));
  };

  return (
    <Background>
      <S.Container>
        <Image source={logo} />

        <S.Form>
          <S.FormInput
            keyboardType="numeric"
            placeholder="Informe seu ID de cadastro"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={idUser}
            onChangeText={setIdUser}
          />

          <S.SubmitButton loading={loading} onPress={handleSubmit}>
            Entrar no sistema
          </S.SubmitButton>
        </S.Form>
      </S.Container>
    </Background>
  );
}
