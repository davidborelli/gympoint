import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';

import * as S from './styles';

import api from '~/services/api';

export default function SearchSelect({ name, ...props }) {
  const ref = useRef();
  const { fieldName, registerField, error } = useField(name);

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value[value]',
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  const loadOptions = async () => {
    const response = await api.get(`students?q=${inputValue}`);

    const data = response.data.map(student => ({
      value: student.id,
      label: student.name,
    }));

    return data;
  };

  const customStyles = {
    input: () => ({
      height: 28,
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isSelected ? '#ee4d64' : provided,
    }),
  };

  return (
    <S.Container>
      <AsyncSelect
        name={fieldName}
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        onInputChange={data => setInputValue(data)}
        ref={ref}
        className="select-student"
        styles={customStyles}
        {...props}
      />

      {error && <span className="error">{error}</span>}
    </S.Container>
  );
}

SearchSelect.propTypes = {
  name: PropTypes.string.isRequired,
};
