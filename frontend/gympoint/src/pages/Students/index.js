import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import icon from '~/assets/icon-buttons.png';
import * as S from './styles';

import api from '~/services/api';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadStudents = async () => {
      const response = await api.get(`students?q=${search}`);

      setStudents(response.data);
    };

    loadStudents();
  }, [search]);

  const handleDelete = async student => {
    try {
      if (window.confirm(`Confirma a exclusão do aluno ${student.name}`)) {
        await api.delete(`students/${student.id}`);

        const newStudentsList = students.filter(
          studentParam => studentParam.id !== student.id
        );

        setStudents(newStudentsList);

        toast.success(`Aluno ${student.name} apagado com sucesso!`);
      }
    } catch (error) {
      toast.error(`Erro ao deletar aluno ${student.name}, verifique...`);
    }
  };

  const handleSearch = event => {
    const { value } = event.target;

    if (value.length >= 2 || value.length === 0) {
      setSearch(event.target.value);
    }
  };

  return (
    <S.Container>
      <header>
        <strong>Gerenciando alunos</strong>
        <div>
          <button type="button">
            <img src={icon} alt="" />
            <span>CADASTRAR</span>
          </button>
          <input placeholder="Buscar aluno" onChange={handleSearch} />
        </div>
      </header>

      <table>
        <thead>
          <tr>
            <th className="name">NOME</th>
            <th className="email">E-MAIL</th>
            <th className="age">IDADE</th>
            <th className="edit"> </th>
          </tr>
        </thead>

        <tbody>
          {students.map(student => (
            <tr>
              <td className="name">{student.name}</td>
              <td className="email">{student.email}</td>
              <td className="age">{student.age}</td>
              <td className="edit">
                <Link to={{ pathname: '/student', state: { student } }}>
                  editar
                </Link>
                <button type="button" onClick={() => handleDelete(student)}>
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
