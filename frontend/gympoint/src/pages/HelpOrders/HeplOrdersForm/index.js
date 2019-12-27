import React from 'react';
import { Input, Form } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';

import { openModal } from '~/store/modules/helpOrders/actions';

import * as S from './styles';

export default function HeplOrdersForm() {
  const dispatch = useDispatch();
  const handleSubmit = data => {};

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  return (
    <S.Modal size="big">
      <S.Container>
        <button type="button" onClick={handleOpenModal}>
          Fechar
        </button>
        <Form onSubmit={handleSubmit}>
          <label className="question-title">PERGUNTA DO ALUNO</label>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti
          delectus accusantium perspiciatis
          <label className="question-response">SUA RESPOSTA</label>
          <Input multiline />
          <button type="submit">Responder aluno</button>
        </Form>
      </S.Container>
    </S.Modal>
  );
}
