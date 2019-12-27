import styled from 'styled-components';

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
  }

  table {
    border-spacing: 0;
    padding: 20px;
    margin-top: 20px;
    border-radius: 4px;
    background: #fff;

    thead {
      line-height: 30px;

      tr {
        th.title {
          text-align: left;
          width: 50%;
        }
      }
    }

    tbody {
      tr {
        td {
          line-height: 40px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        td.title {
          text-align: left;
          width: 50%;
        }
      }

      td.edit {
        text-align: right;

        button {
          border: 0;
          color: #4d85ee;
        }
      }
    }
  }
`;
