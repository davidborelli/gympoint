import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 800px;
  margin: 30px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    strong {
      color: #444;
      font-size: 22px;
    }

    div {
      display: flex;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;

      font-weight: bold;
      color: #fff;
      width: 110px;
      height: 36px;
      border-radius: 4px;

      span {
        margin-left: 5px;
      }
    }

    button#btnSalvar {
      background: #ee4d64;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }
    }

    button#btnVoltar {
      background: #cccccc;
      transition: background 0.2s;

      margin-right: 10px;

      &:hover {
        background: ${darken(0.03, '#cccccc')};
      }
    }

    input {
      width: 237px;
      height: 36px;
      margin-left: 10px;
      border-radius: 4px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      background: #fff;
      padding-left: 5px;
    }
  }

  form {
    div.body {
      span {
        color: #fff;
        background: #ee4d64;
        padding-left: 5px;
        border-radius: 4px;
        font-weight: bold;
        margin-top: 2px;
      }

      display: flex;
      flex-direction: column;

      padding: 20px;
      margin-top: 20px;
      border-radius: 4px;
      background: #fff;

      label {
        font-weight: bold;
        margin: 15px 0 5px 0;
        font-size: 14px;
      }

      input {
        height: 30px;
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        padding-left: 15px;
      }

      div {
        display: flex;
        justify-content: flex-start;
        flex: 1;

        div {
          display: flex;
          flex-direction: column;

          width: 100%;
        }

        div.weight {
          margin: 0 10px;
        }
      }
    }
  }
`;
