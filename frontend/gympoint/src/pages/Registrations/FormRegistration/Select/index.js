import React, { useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import Select from 'react-select';
import PropTypes from 'prop-types';

export default function CustomSelect({ name, options, onChangeParam }) {
  const ref = useRef();
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value[value]',
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function getDefaultValue() {
    if (!defaultValue) return null;

    return options.find(option => option.id === defaultValue);
  }

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

  const handleChange = event => {
    onChangeParam(event);
  };

  return (
    <>
      <Select
        name={fieldName}
        options={options}
        className="basic-single"
        classNamePrefix="select"
        defaultValue={getDefaultValue()}
        ref={ref}
        placeholder="Selecione o plano"
        styles={customStyles}
        onChange={event => handleChange(event)}
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
  onChangeParam: PropTypes.func.isRequired,
};
