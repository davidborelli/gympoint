import React, { useState, useEffect, useRef } from 'react';
import CurrencyInput from 'react-currency-input';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

export default function MaskedInput({ name, inputMask }) {
  const ref = useRef(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [mask, setMask] = useState(defaultValue || '');

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
      clearValue: pickerRef => {
        pickerRef.setInputValue(null);
      },
    });
  }, [ref, ref.current, fieldName]); // eslint-disable-line

  function handleMask(event) {
    const { value } = event.target;

    return setMask(value);
  }

  return (
    <>
      <CurrencyInput
        name={fieldName}
        suffix={inputMask}
        value={mask}
        onChangeEvent={handleMask}
        inputType="text"
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}

MaskedInput.propTypes = {
  name: PropTypes.string.isRequired,
  inputMask: PropTypes.string.isRequired,
};
