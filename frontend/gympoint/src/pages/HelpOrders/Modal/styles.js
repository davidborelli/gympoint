import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.5);
  padding: 20px;
  width: 400px;

  display: flex;
  flex-direction: column;

  div.question {
    display: flex;
    flex-direction: column;

    div.question-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;

      svg:hover {
        cursor: pointer;
      }
    }

    textarea {
      color: rgba(0, 0, 0, 0.5);
      resize: none;
      border: 0;
      font-size: 14px;
      line-height: 20px;
      height: 100px;
    }
  }

  div.response {
    margin-top: 10px;
    display: flex;
    flex-direction: column;

    strong {
      text-align: left;
      height: 25px;
    }

    textarea {
      resize: none;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      font-size: 14px;
      line-height: 20px;
      height: 150px;
      color: rgba(0, 0, 0, 0.5);
      padding: 5px;
    }
  }

  button#submit {
    display: flex;
    align-items: center;
    justify-content: center;

    background: #ee4d64;
    font-weight: bold;
    color: #fff;
    width: 100%;
    height: 36px;
    border-radius: 4px;
    margin-top: 10px;

    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, '#ee4d64')};
    }
  }
`;
