import { FC } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { setIsOpenedModalWindow } from '../store/reducers/interfaceSlice';

const DarkBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  top: 0;
  position: fixed;
  overflow: hidden;
  z-index: 2;
`;

const ModalBlock = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 400px;
  border-radius: 25px;
  background-color: #fff;
  z-index: 3;
`;

const ModalWindow: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <DarkBackground
        onClick={() => {
          dispatch(setIsOpenedModalWindow(false));
        }}
      >
        <ModalBlock />
      </DarkBackground>
    </>
  );
};

export default ModalWindow;
