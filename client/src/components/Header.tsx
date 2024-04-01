import { FC } from 'react';
import styled from 'styled-components';
import { FaRegMoon } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { setIsOpenedModalWindow } from '../store/reducers/interfaceSlice';

const HeaderWrapper = styled.header`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: #fff;
  top: 0;
  z-index: 1;
  border-bottom: 1px solid #000;

  & button {
    margin: 0;
    padding: 0;
    width: 120px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #939393;
    background-color: #fff;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
    color: #939393;

    &:hover {
      cursor: pointer;
      border: 2px solid transparent;
      color: #fff;
      background-color: #939393;
    }
  }
`;

const HeaderContent = styled.div`
  width: 1120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isOpenedModalWindow = useSelector(
    (state: RootState) => state.interfaceReducer.isOpenedModalWindow
  );

  return (
    <HeaderWrapper>
      <HeaderContent>
        <FaRegMoon />
        <button
          onClick={() => {
            dispatch(setIsOpenedModalWindow(!isOpenedModalWindow));
          }}
        >
          Войти
        </button>
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default Header;
