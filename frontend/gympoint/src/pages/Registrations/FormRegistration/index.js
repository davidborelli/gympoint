import React, { useState, useEffect, useMemo } from 'react';
import { Form } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  createRegistrationRequest,
  updateRegistrationRequest,
} from '~/store/modules/registration/actions';

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

export default function FormRegistration() {
  const dispatch = useDispatch();

  const [student, setStudent] = useState('');

  const [plans, setPlans] = useState([]);
  const [planSelected, setPlanSelected] = useState('');
  const [initialDate, setInicialDate] = useState(new Date());

  const { registrationId } = useParams();

  const finalDate = useMemo(
    () => addMonths(initialDate, planSelected.duration || 0),
    [initialDate, planSelected.duration]
  );

  const totalPrice = useMemo(() => planSelected.duration * planSelected.price, [
    planSelected.duration,
    planSelected.price,
  ]);

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
    const loadRegistrationLocated = async () => {
      const response = await api.get(`registrations/${registrationId}`);

      const date = parseISO(response.data.start_date);

      const plan = {
        value: response.data.Plan.id,
        label: response.data.Plan.title,
        price: response.data.Plan.price,
        duration: response.data.Plan.duration,
      };

      const studentLoaded = {
        value: response.data.Student.id,
        label: response.data.Student.name,
      };

      setInicialDate(date);
      setPlanSelected(plan);
      setStudent(studentLoaded);
    };

    loadRegistrationLocated();
  }, [registrationId]);

  const handleSubmit = data => {
    if (registrationId) {
      data = {
        ...data,
        id: registrationId,
      };
      dispatch(updateRegistrationRequest(data));
    } else {
      dispatch(createRegistrationRequest(data));
    }
  };

  return (
    <S.Container>
      <Form onSubmit={handleSubmit} schema={schema} autoComplete="off">
        <header>
          {registrationId ? (
            <strong>Edição de matrícula</strong>
          ) : (
            <strong>Cadastro de matrícula</strong>
          )}

          <div>
            <button
              id="btnVoltar"
              type="button"
              onClick={() => {
                history.push('/registrations');
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
            <SearchSelected
              name="student_id"
              value={student}
              placeholder="Selecione o aluno"
              onChange={selected => setStudent(selected)}
            />
          </div>

          <div className="inputs-footer">
            <div className="plan">
              <label htmlFor="plan">PLANO</label>
              <Select
                options={plans}
                name="plan_id"
                onChange={event => setPlanSelected(event)}
                value={planSelected}
                getOptionLabel={option => option.label}
                getOptionValue={option => option.value}
              />
            </div>

            <div className="date-start">
              <label htmlFor="date-start">DATA DE INÍCIO</label>
              <DatePicker
                name="start_date"
                selected={initialDate}
                onChange={date => setInicialDate(date)}
                readOnly={!planSelected.value}
              />
            </div>

            <div className="date-end">
              <label htmlFor="date-end">DATA DE TÉRMINO</label>
              <DatePicker name="date_end" selected={finalDate} readOnly />
            </div>

            <div className="full-price">
              <label htmlFor="full-price">VALOR FINAL</label>
              <input disabled value={formater.format(totalPrice || 0.0)} />
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
