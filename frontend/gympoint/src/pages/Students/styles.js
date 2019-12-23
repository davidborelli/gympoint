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

      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      width: 142px;
      height: 36px;
      border-radius: 4px;

      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }

      span {
        margin-left: 5px;
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

      &::placeholder {
        padding-left: 5px;
      }
    }
  }

  table {
    border-spacing: 0;
    padding: 20px;
    margin-top: 20px;
    border-radius: 4px;
    background: #fff;

    thead {
      line-height: 30px;

      tr th {
        text-align: left;
      }

      th.age {
        text-align: center;
      }
    }

    tbody {
      tr td {
        line-height: 40px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      td.age {
        text-align: center;
      }

      td.edit {
        text-align: center;

        a {
          color: #4d85ee;
          margin-right: 10px;
        }

        button {
          border: 0;
          color: #de3b3b;
        }
      }
    }
  }
`;
