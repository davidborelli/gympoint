import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as S from './styles';

import api from '~/services/api';

import Modal from './Modal';

import { openModal } from '~/store/modules/helpOrders/actions';

export default function HelpOrders() {
  const dispatch = useDispatch();
  const modal = useSelector(state => state.helpOrders.helpOrdersModalOpen);
  const [modalData, setModalData] = useState('');
  const [helpOrders, setHelpOrders] = useState([]);

  const handleOpenModal = modalDataParam => {
    setModalData(modalDataParam);
    dispatch(openModal());
  };

  useEffect(() => {
    const loadHelpOrders = async () => {
      const response = await api.get('help-orders');

      setHelpOrders(response.data);
    };

    loadHelpOrders();
  }, []);

  return (
    <S.Container>
      <header>
        <strong>Pedidos de auxílio</strong>
      </header>

      <table>
        <thead>
          <tr>
            <th className="title">ALUNO</th>
            <th className="edit"> </th>
          </tr>
        </thead>

        <tbody>
          {helpOrders.map(help => (
            <tr key={String(help.id)}>
              <td className="title">{help.Student.name}</td>
              <td className="edit">
                <button type="button" onClick={() => handleOpenModal(help)}>
                  responder
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modal && <Modal data={modalData} fnClose={handleOpenModal} />}
    </S.Container>
  );
}
