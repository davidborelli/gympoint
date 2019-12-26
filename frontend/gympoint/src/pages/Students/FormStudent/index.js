import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import {
  createStudentRequest,
  updateStudentRequest,
} from '~/store/modules/student/actions';

import history from '~/services/history';

import icon from '~/assets/icon-buttons.png';
import * as S from './styles';

const schema = Yup.object().shape({
  id: Yup.number()
    .transform(value => (!value ? undefined : value))
    .integer(),
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email()
    .required('O e-mail é obrigatório'),
  age: Yup.number()
    .transform(value => (!value ? undefined : value))
    .integer()
    .required('A idade é obrigatória'),
  weight: Yup.number()
    .transform(value => (!value ? undefined : value))
    .required('O peso é obrigatório'),
  height: Yup.number()
    .transform(value => (!value ? undefined : value))
    .required('A altura é obrigatória'),
});

export default function FormStudent({ location }) {
  const dispatch = useDispatch();

  const { studentLocated } = location.state || {};
  const [student] = useState(studentLocated);

  const handleSubmit = (data, { resetForm }) => {
    if (student) {
      data = {
        ...data,
        id: student.id,
      };

      dispatch(updateStudentRequest(data));
    } else {
      dispatch(createStudentRequest(data));
      resetForm();
    }
  };

  return (
    <S.Container>
      <Form
        initialData={student}
        onSubmit={handleSubmit}
        schema={schema}
        autoComplete="off"
      >
        <header>
          <strong>Cadastro de alunos</strong>
          <div>
            <button
              id="btnVoltar"
              type="button"
              onClick={() => {
                history.push('/students');
              }}
            >
              <img src={icon} alt="" />
              <span>VOLTAR </span>
            </button>
            <button id="btnSalvar" type="submit">
              <img src={icon} alt="" />
              <span>SALVAR </span>
            </button>
          </div>
        </header>

        <div className="body">
          <label htmlFor="name">NOME COMPLETO</label>
          <Input name="name" type="text" placeholder="John Doe" />

          <label htmlFor="email">ENDEREÇO DE E-MAIL</label>
          <Input name="email" type="email" placeholder="exemplo@email.com" />

          <div>
            <div className="age">
              <label htmlFor="age">IDADE</label>
              <Input type="number" name="age" />
            </div>

            <div className="weight">
              <label htmlFor="weight">PESO (em kg)</label>
              {/* <MaskedInput name="weight" inputMask=" kg" /> */}
              <Input type="number" min="1" step="0.01" name="weight" />
            </div>

            <div className="height">
              <label htmlFor="height">Altura</label>
              {/* <MaskedInput name="height" inputMask="m" /> */}
              <Input type="number" min="1" step="0.01" name="height" />
            </div>
          </div>
        </div>
      </Form>
    </S.Container>
  );
}

FormStudent.defaultProps = {
  location: PropTypes.shape({
    state: {},
  }),
};

FormStudent.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
};
