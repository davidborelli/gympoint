import styled from 'styled-components/native';
import logo from '../../assets/logoheader.png';

export const Container = styled.View`
  height: 80px;
  background: #fff;
`;

export const Logo = styled.Image.attrs({
  source: logo,
})`
  margin-top: 5px;
  height: 20px;
  width: 150px;
  align-self: center;
  margin-top: 46px;
`;
