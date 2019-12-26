import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 800px;
  margin: 30px auto;

  display: flex;
  flex-direction: column;

  form {
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

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

    div.body {
      display: flex;
      flex-direction: column;

      padding: 20px;
      background: #fff;
      border-radius: 4px;

      div.search-student {
        label {
          font-weight: bold;
        }

        div.select-student {
          margin-top: 5px;
        }

        span.error {
          color: #fff;
          background: #ee4d64;
          padding-left: 5px;
          border-radius: 4px;
          font-weight: bold;
          margin-top: 2px;
          display: block;
        }
      }

      div.inputs-footer {
        display: flex;
        justify-content: flex-start;
        margin-top: 20px;

        input {
          height: 36px;
          border-radius: 4px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          padding: 10px;
        }

        label {
          margin-bottom: 5px;
          font-weight: bold;
        }

        div.plan {
          display: flex;
          flex-direction: column;
          width: 100%;

          input {
            width: 100%;
          }

          span.error {
            color: #fff;
            background: #ee4d64;
            padding-left: 5px;
            border-radius: 4px;
            font-weight: bold;
            margin-top: 2px;
            display: block;
          }
        }

        div.date-start {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin: 0 10px;

          input {
            width: 100%;
          }

          span {
            color: #fff;
            background: #ee4d64;
            padding-left: 5px;
            border-radius: 4px;
            font-weight: bold;
            margin-top: 2px;
            display: block;
          }
        }

        div.date-end {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin-right: 10px;

          input {
            width: 100%;
            background: #f5f5f5;
          }
        }

        div.full-price {
          display: flex;
          flex-direction: column;
          width: 100%;

          input {
            width: 100%;
            background: #f5f5f5;
          }
        }
      }
    }
  }
`;
