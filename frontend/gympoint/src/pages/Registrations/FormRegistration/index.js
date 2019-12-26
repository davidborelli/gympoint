import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { format, addMonths } from 'date-fns';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { createRegistrationRequest } from '~/store/modules/registration/actions';

import Select from './Select';
import formater from '~/components/formater';
import SearchSelected from './SearchSelect';
import DatePicker from './DatePicker';

import history from '~/services/history';
import api from '~/services/api';

import icon from '~/assets/icon-buttons.png';
import * as S from './styles';

const schema = Yup.object().shape({
  student_id: Yup.number()
    .transform(value => (!value ? undefined : value))
    .required('Aluno é obrigatório'),
  plan_id: Yup.number()
    .transform(value => (!value ? undefined : value))
    .integer()
    .required('O plano é obrigatório'),
  start_date: Yup.date().required('A data é obrigatório'),
});

export default function FormRegistration({ location }) {
  const dispatch = useDispatch();

  const { planLocated } = location.state || '';
  const [registration, setRegistration] = useState('');

  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [startDate, setStartDate] = useState('');
  const [defPlan, setDefPlan] = useState('');
  const [student, setStudent] = useState('');

  const { registrationId } = useParams();

  const fullValue = useMemo(() => selectedPlan.duration * selectedPlan.price, [
    selectedPlan.duration,
    selectedPlan.price,
  ]);

  const dateEnd = useMemo(
    () =>
      startDate
        ? format(addMonths(startDate, selectedPlan.duration), 'd/MM/yyyy')
        : '',
    [selectedPlan.duration, startDate]
  );

  useEffect(() => {
    const loadPlans = async () => {
      const response = await api.get('plans');

      const data = response.data.map(pl => ({
        value: pl.id,
        label: pl.title,
        duration: pl.duration,
        price: parseFloat(pl.price),
      }));

      setPlans(data);
    };

    loadPlans();
  }, []);

  useEffect(() => {
    const loadRegistrationLocated = () => {
      if (planLocated) {
        setSelectedPlan({
          value: planLocated.Plan.id,
          label: planLocated.Plan.title,
          price: planLocated.Plan.price,
          duration: planLocated.Plan.duration,
        });
        setStartDate(new Date(planLocated.start_date));
        setDefPlan({
          value: planLocated.Plan.id,
          label: planLocated.Plan.title,
        });
        setStudent({
          value: 1,
          label: 'David Borelli',
        });

        setRegistration({
          plan_id: defPlan,
          start_date: new Date(planLocated.start_date),
          student_id: student,
        });
      }
    };

    loadRegistrationLocated();
  }, []); // eslint-disable-line

  const handleSubmit = data => {
    dispatch(createRegistrationRequest(data));
  };

  const handleStartDate = event => {
    setStartDate(event);
  };

  const handlePlan = event => {
    setSelectedPlan(event);
  };

  return (
    <S.Container>
      <Form
        initialData={registration}
        onSubmit={handleSubmit}
        schema={schema}
        autoComplete="off"
      >
        <header>
          <strong>Cadastro de matrícula</strong>
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
          <div className="search-student">
            <label htmlFor="title">ALUNO</label>
            <SearchSelected name="student_id" placeholder="Selecione o aluno" />
          </div>

          <div className="inputs-footer">
            <div className="plan">
              <label htmlFor="plan">PLANO</label>
              <Select
                options={plans}
                name="plan_id"
                onChangeParam={handlePlan}
              />
            </div>

            <div className="date-start">
              <label htmlFor="date-start">DATA DE INÍCIO</label>
              <DatePicker
                name="start_date"
                onChangeParam={handleStartDate}
                readOnly={!selectedPlan.value}
              />
            </div>

            <div className="date-end">
              <label htmlFor="date-end">DATA DE TÉRMINO</label>
              <Input disabled value={dateEnd} name="date_end" />
            </div>

            <div className="full-price">
              <label htmlFor="full-price">VALOR FINAL</label>
              <input disabled value={formater.format(fullValue || 0.0)} />
            </div>
          </div>
        </div>
      </Form>
    </S.Container>
  );
}

FormRegistration.defaultProps = {
  location: PropTypes.shape({
    state: {},
  }),
};

FormRegistration.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
};
