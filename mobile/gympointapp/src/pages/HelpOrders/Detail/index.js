import React from 'react';
import PropTypes from 'prop-types';
import Background from '~/components/Background';

import * as S from './styles';

export default function Consult({ navigation }) {
  const dataReceived = navigation.getParam('data');

  return (
    <Background>
      <S.Container>
        <S.BoxHelp>
          <S.HeaderBox>
            <S.TextHeaderLeft>PERGUNTA</S.TextHeaderLeft>
            <S.TextHeaderRight>{dataReceived.relativeDate}</S.TextHeaderRight>
          </S.HeaderBox>
          <S.Body>{dataReceived.question}</S.Body>
          {dataReceived.answer_at && (
            <S.Answer>
              <S.HeaderAnswer>RESPOSTA</S.HeaderAnswer>
              <S.BodyHeader>{dataReceived.answer}</S.BodyHeader>
            </S.Answer>
          )}
        </S.BoxHelp>
      </S.Container>
    </Background>
  );
}

Consult.defaultProps = {
  navigation: {},
};

Consult.propTypes = {
  navigation: PropTypes.shape(PropTypes.object),
};
