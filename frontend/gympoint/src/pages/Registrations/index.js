import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdAssignmentTurnedIn } from 'react-icons/md';
import icon from '~/assets/icon-buttons.png';

import * as S from './styles';

import api from '~/services/api';
import history from '~/services/history';

export default function Registrations() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const loadRegistrations = async () => {
      const response = await api.get('registrations');

      const registrationsFormated = response.data.map(regLocated => ({
        ...regLocated,
        start_date: regLocated.start_date,
        start_date_formated: format(
          parseISO(regLocated.start_date),
          "d 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
        end_date: regLocated.end_date,
        end_date_formated: format(
          parseISO(regLocated.end_date),
          "d 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
      }));

      setRegistrations(registrationsFormated);
    };

    loadRegistrations();
  }, []);

  const handleDelete = async registration => {
    try {
      if (
        window.confirm(
          `Confirma a exclusão da matrícula do aluno ${registration.Student.name}`
        )
      ) {
        await api.delete(`registrations/${registration.id}`);

        const newRegistrationsList = registrations.filter(
          registrationParam => registrationParam.id !== registration.id
        );

        setRegistrations(newRegistrationsList);

        toast.success(
          `Matrícula do aluno ${registration.Student.name} apagado com sucesso!`
        );
      }
    } catch (error) {
      toast.error(
        `Erro ao deletar a matrícula do aluno ${registration.Student.name}, verifique...`
      );
    }
  };

  const handleNewRegistration = () => {
    history.push('/registrations/new');
  };

  return (
    <S.Container>
      <header>
        <strong>Gerenciando matrículas</strong>
        <div>
          <button type="button" onClick={handleNewRegistration}>
            <img src={icon} alt="" />
            <span>CADASTRAR</span>
          </button>
        </div>
      </header>

      <table>
        <thead>
          <tr>
            <th className="student">ALUNO</th>
            <th className="plan">PLANO</th>
            <th className="start">INÍCIO</th>
            <th className="end">TÉRMINO</th>
            <th className="active">ATIVA</th>
            <th className="edit"> </th>
          </tr>
        </thead>

        <tbody>
          {registrations.map(registration => (
            <tr key={registration.id}>
              <td className="student">{registration.Student.name}</td>
              <td className="plan">{registration.Plan.title}</td>
              <td className="start">{registration.start_date_formated}</td>
              <td className="end">{registration.end_date_formated}</td>
              <td className="active">
                {registration.active ? (
                  <MdAssignmentTurnedIn size={21} color="#42CB59" />
                ) : (
                  <MdAssignmentTurnedIn size={21} color="#DDDDDD" />
                )}
              </td>
              <td className="edit">
                <Link
                  to={{
                    pathname: `/registrations/${registration.id}`,
                    state: { planLocated: registration },
                  }}
                >
                  editar
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(registration)}
                >
                  apagar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </S.Container>
  );
}
