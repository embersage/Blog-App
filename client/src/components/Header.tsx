import { FC } from 'react';
import styled from 'styled-components';
import { FaRegMoon } from 'react-icons/fa';
import { MdOutlineCreate } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { logout } from '../store/reducers/userSlice';
import { setIsOpenedModalWindow } from '../store/reducers/interfaceSlice';

const HeaderWrapper = styled.header`
  padding: 10px 15px;
  width: 100%;
  top: 0;
  position: sticky;
  z-index: 1;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 10px rgb(233, 233, 233);
`;

const HeaderInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderContent = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1160px;

  & button {
    margin: 0;
    padding: 0;
    width: 150px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #939393;
    background-color: #fff;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
    color: #939393;

    & span {
      display: flex;
      justify-content: space-between;
      column-gap: 5px;
    }

    &:hover {
      cursor: pointer;
      border: 2px solid transparent;
      color: #fff;
      background-color: #939393;
    }
  }
`;

const Header: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.userReducer.data);

  return (
    <HeaderWrapper>
      <HeaderInner>
        <HeaderContent>
          <FaRegMoon />
          {userData ? (
            <>
              <button onClick={() => {}}>
                <span>
                  <MdOutlineCreate />
                  Создать статью
                </span>
              </button>
              <button
                onClick={() => {
                  dispatch(logout());
                  localStorage.removeItem('token');
                }}
              >
                Выйти
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                dispatch(setIsOpenedModalWindow(true));
              }}
            >
              Войти
            </button>
          )}
        </HeaderContent>
      </HeaderInner>
    </HeaderWrapper>
  );
};

export default Header;
