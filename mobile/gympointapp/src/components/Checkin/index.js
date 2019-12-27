import React from 'react';

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
