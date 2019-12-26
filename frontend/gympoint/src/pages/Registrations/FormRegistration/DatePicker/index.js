import React, { useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import pt from 'date-fns/locale/pt';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

export default function CustomDatePicker({ name, ...props }) {
  const ref = useRef();
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <DatePicker
        name={fieldName}
        placeholderText="Escolha a data"
        ref={ref}
        locale={pt}
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
        autoComplete="off"
        {...props}
      />
      {error && <span>{error}</span>}
    </>
  );
}

CustomDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  onChangeParam: PropTypes.func.isRequired,
};
