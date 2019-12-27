import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { openModal } from '~/store/modules/helpOrders/actions';

import api from '~/services/api';

export function* responseHelpOrder({ payload }) {
  try {
    const { data } = payload;

    yield call(api.put, `help-orders/${data.id}/answer`, data);

    toast.success('Pergunta respondida com sucesso!');
    yield put(openModal());
  } catch (error) {
    toast.error('Erro responder pergunta, verifique...');
  }
}

export default all([
  takeLatest('@helpOrders/UPDATE_HELPORDER_REQUEST', responseHelpOrder),
]);
