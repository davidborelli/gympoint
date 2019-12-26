import React, { useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import Select from 'react-select';
import PropTypes from 'prop-types';

export default function CustomSelect({ name, options, ...props }) {
  const ref = useRef();
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value[value]',
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  const customStyles = {
    input: () => ({
      height: 28,
      padding: 0,
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isSelected ? '#ee4d64' : provided,
    }),
  };

  return (
    <>
      <Select
        name={fieldName}
        options={options}
        className="basic-single"
        classNamePrefix="select"
        ref={ref}
        placeholder="Selecione o plano"
        styles={customStyles}
        {...props}
      />

      {error && <span className="error">{error}</span>}
    </>
  );
}

CustomSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
      duration: PropTypes.number,
      price: PropTypes.number,
    })
  ).isRequired,
};
