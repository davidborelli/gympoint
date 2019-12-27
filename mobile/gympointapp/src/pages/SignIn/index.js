import React from 'react';
import { Image } from 'react-native';

import Background from '~/components/Background';

import logo from '~/assets/logosplash.png';

import * as S from './styles';

export default function SignIn() {
  const handleSubmit = () => {};

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
          />

          <S.SubmitButton onPress={handleSubmit}>
            Entrar no sistema
          </S.SubmitButton>
        </S.Form>
      </S.Container>
    </Background>
  );
}
