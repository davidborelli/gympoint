import React from 'react';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';
import { Input, Form } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';

import { updateHelpOrdersRequest } from '~/store/modules/helpOrders/actions';

import * as S from './styles';

export default function Modal({ data, fnClose }) {
  const dispatch = useDispatch();

  const handleSubmit = formData => {
    dispatch(updateHelpOrdersRequest(formData));
  };

  return (
    <S.Container>
      <S.Content>
        <Form onSubmit={handleSubmit} initialData={data}>
          <Input name="id" hidden />
          <div className="question">
            <div className="question-header">
              <strong>PERGUNTA DO ALUNO</strong>
              <MdClose size={18} onClick={fnClose} />
            </div>
            <Input multiline readOnly name="question" />
          </div>
          <div className="response">
            <strong>SUA RESPOSTA</strong>
            <Input
              autoCapitalize="off"
              placeholder="Digite sua mensagem aqui..."
              multiline
              name="answer"
            />
          </div>
          <button id="submit" type="submit">
            Responder aluno
          </button>
        </Form>
      </S.Content>
    </S.Container>
  );
}

Modal.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.object,
  }).isRequired,
  fnClose: PropTypes.func.isRequired,
};
