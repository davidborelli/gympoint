import { takeLatest, call, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';

import api from '~/services/api';

export function* createRegistration({ payload }) {
  try {
    const registration = payload.data;

    yield call(api.post, 'registrations', registration);

    toast.success('Matrícula cadastrada com sucesso!');
    history.push('/registrations');
  } catch (error) {
    toast.error('Erro ao cadastrar matrícula, verifique os dados...');
  }
}

export function* updateRegistration({ payload }) {
  try {
    const registration = payload.data;

    yield call(api.put, 'registrations', registration);

    toast.success('Matrícula atualizada com sucesso!');
    history.push('/registrations');
  } catch (error) {
    toast.error('Erro ao atualizar matrícula, verifique os dados...');
  }
}

export default all([
  takeLatest('@registration/CREATE_REGISTRATION_REQUEST', createRegistration),
  takeLatest('@registration/UPDATE_REGISTRATION_REQUEST', updateRegistration),
]);
