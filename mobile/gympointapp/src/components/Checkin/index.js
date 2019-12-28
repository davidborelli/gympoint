import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

export default function Checkin({ data }) {
  return (
    <S.Container>
      <S.BoxInfo>
        <S.BoxTitle>Check-in #{data.id}</S.BoxTitle>
        <S.BoxDate>{data.relativeDate}</S.BoxDate>
      </S.BoxInfo>
    </S.Container>
  );
}

Checkin.propTypes = {
  data: PropTypes.shape(PropTypes.object).isRequired,
};
