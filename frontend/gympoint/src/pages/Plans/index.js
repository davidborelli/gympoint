import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import icon from '~/assets/icon-buttons.png';

import * as S from './styles';

import api from '~/services/api';
import history from '~/services/history';
import formater from '~/components/formater';

export default function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const loadPlans = async () => {
      const response = await api.get('plans');

      setPlans(response.data);
    };

    loadPlans();
  }, []);

  const handleDelete = async plan => {
    try {
      if (window.confirm(`Confirma a exclusão do plano ${plan.title}`)) {
        await api.delete(`plans/${plan.id}`);

        const newPlansList = plans.filter(
          planParam => planParam.id !== plan.id
        );

        setPlans(newPlansList);

        toast.success(`Plano ${plan.title} apagado com sucesso!`);
      }
    } catch (error) {
      toast.error(`Erro ao deletar plano ${plan.title}, verifique...`);
    }
  };

  const handleNewPlan = () => {
    history.push('/plans/new');
  };

  return (
    <S.Container>
      <header>
        <strong>Gerenciando planos</strong>
        <div>
          <button type="button" onClick={handleNewPlan}>
            <img src={icon} alt="" />
            <span>CADASTRAR</span>
          </button>
        </div>
      </header>

      <table>
        <thead>
          <tr>
            <th className="title">TÍTULO</th>
            <th className="duration">DURAÇÃO</th>
            <th className="price">VALOR P/ MÊS</th>
            <th className="edit"> </th>
          </tr>
        </thead>

        <tbody>
          {plans.map(plan => (
            <tr key={plan.title}>
              <td className="title">{plan.title}</td>
              <td className="duration">
                {plan.duration} {plan.duration === 1 ? 'mês' : 'meses'}
              </td>
              <td className="price">{formater.format(plan.price)}</td>
              <td className="edit">
                <Link
                  to={{
                    pathname: `/plans/${plan.id}`,
                    state: { planLocated: plan },
                  }}
                >
                  editar
                </Link>
                <button type="button" onClick={() => handleDelete(plan)}>
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
