import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import { signInSuccess, signFailure } from './actions';

import api from '~/services/api';

export function* signIn({ payload }) {
  try {
    const { idUser } = payload;

    const response = yield call(api.get, `students/${idUser}`);

    const { id, name } = response.data;

    yield put(signInSuccess(id, name));
  } catch (error) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no acessar, verifique seus dados...'
    );
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
