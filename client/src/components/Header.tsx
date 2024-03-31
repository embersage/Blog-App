import { FC } from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  margin: 0;
  padding: 0;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & button {
    margin: 0;
    padding: 0;
    width: 120px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: transparent;
    background-color: #fff;

    &:hover {
      cursor: pointer;
    }
  }
`;

const Header: FC = () => {
  return (
    <HeaderWrapper>
      <button>Войти</button>
    </HeaderWrapper>
  );
};

export default Header;
