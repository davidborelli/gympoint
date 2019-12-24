import { takeLatest, call, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';

import api from '~/services/api';

export function* createStudent({ payload }) {
  try {
    const student = payload.data;

    yield call(api.post, 'students', student);

    toast.success('Aluno cadastrado com sucesso!');
  } catch (error) {
    toast.error('Erro ao cadastrar aluno, verifique os dados...');
  }
}

export function* updateStudent({ payload }) {
  try {
    const student = payload.data;

    yield call(api.put, 'students', student);

    toast.success('Aluno atualizado com sucesso!');
    history.push('/students');
  } catch (error) {
    toast.error('Erro ao atualizar aluno, verifique os dados...');
  }
}

export default all([
  takeLatest('@student/CREATE_STUDENT_REQUEST', createStudent),
  takeLatest('@student/UPDATE_STUDENT_REQUEST', updateStudent),
]);
