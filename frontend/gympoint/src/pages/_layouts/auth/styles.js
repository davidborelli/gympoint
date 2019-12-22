import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 40px 30px;
  width: 100%;
  max-width: 315px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      color: #444444;
      align-self: flex-start;
      margin: 0 0 3px;
      font-weight: bold;
    }

    input {
      border-color: rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      margin: 0 0 15px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.2);
      }
    }

    span {
      color: #ee4d64;
      align-self: flex-start;
      margin: -15px 0 5px 0;
      font-weight: bold;
    }

    button {
      height: 44px;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
