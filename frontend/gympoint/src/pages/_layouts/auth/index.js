import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

export default function AuthLayout({ children }) {
  return (
    <S.Wrapper>
      <S.Content>{children}</S.Content>
    </S.Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
