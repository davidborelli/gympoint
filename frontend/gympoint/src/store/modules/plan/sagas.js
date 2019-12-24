import { takeLatest, call, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';

import api from '~/services/api';

export function* createPlan({ payload }) {
  try {
    const plan = payload.data;

    yield call(api.post, 'plans', plan);

    toast.success('Plano cadastrado com sucesso!');
  } catch (error) {
    toast.error('Erro ao cadastrar plano, verifique os dados...');
  }
}

export function* updatePlan({ payload }) {
  try {
    const plan = payload.data;

    yield call(api.put, 'plans', plan);

    toast.success('Plano atualizado com sucesso!');
    history.push('/plans');
  } catch (error) {
    toast.error('Erro ao atualizar plano, verifique os dados...');
  }
}

export default all([
  takeLatest('@plan/CREATE_PLAN_REQUEST', createPlan),
  takeLatest('@plan/UPDATE_PLAN_REQUEST', updatePlan),
]);
