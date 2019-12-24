import React, { useState, useMemo } from 'react';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import formater from '~/components/formater';

import {
  createPlanRequest,
  updatePlanRequest,
} from '~/store/modules/plan/actions';

import history from '~/services/history';

import icon from '~/assets/icon-buttons.png';
import * as S from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.number()
    .transform(value => (!value ? undefined : value))
    .integer()
    .required('A duração é obrigatória'),
  price: Yup.number()
    .transform(value => (!value ? undefined : value))
    .required('O preço mensal é obrigatório'),
});

export default function FormPlan({ location }) {
  const dispatch = useDispatch();

  const { planLocated } = location.state || {};
  const [plan] = useState(planLocated);

  const [duration, setDuration] = useState(plan ? plan.duration : 0);
  const [price, setPrice] = useState(plan ? plan.price : 0.0);

  const fullValue = useMemo(() => duration * price, [duration, price]);

  const handleSubmit = (data, { resetForm }) => {
    if (plan) {
      data = {
        ...data,
        id: plan.id,
      };

      dispatch(updatePlanRequest(data));
    } else {
      dispatch(createPlanRequest(data));
      setPrice(0.0);
      setDuration(0);
      resetForm();
    }
  };

  return (
    <S.Container>
      <Form initialData={plan} onSubmit={handleSubmit} schema={schema}>
        <header>
          <strong>Cadastro de planos</strong>
          <div>
            <button
              id="btnVoltar"
              type="button"
              onClick={() => {
                history.push('/plans');
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
          <label htmlFor="title">TÍTULO DO PLANO</label>
          <Input name="title" type="text" />

          <div>
            <div className="duration">
              <label htmlFor="duration">DURAÇÃO (em meses)</label>
              <Input
                type="number"
                name="duration"
                onChange={event => setDuration(event.target.value)}
              />
            </div>

            <div className="price">
              <label htmlFor="price">PREÇO MENSAL</label>
              <Input
                type="number"
                min="1"
                step="0.01"
                name="price"
                onChange={event => setPrice(event.target.value)}
              />
            </div>

            <div className="full-price">
              <label htmlFor="full-price">PREÇO TOTAL</label>
              <input disabled value={formater.format(fullValue)} />
            </div>
          </div>
        </div>
      </Form>
    </S.Container>
  );
}

FormPlan.defaultProps = {
  location: PropTypes.shape({
    state: {},
  }),
};

FormPlan.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
};
