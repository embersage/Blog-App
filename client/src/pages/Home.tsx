import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../store';
import { login, register } from '../store/reducers/userSlice';
import { fetchPost, fetchPosts } from '../store/reducers/postsSlice';
import PostBlock from '../components/PostBlock';
import IPost from '../models/IPost';
import ModalWindow from '../components/ModalWindow';
import { setIsOpenedModalWindow } from '../store/reducers/interfaceSlice';

const ContentWrapper = styled.main`
  padding: 0 15px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

const PostBlockWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 20px;
`;

const AuthorizationBlock = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;

  & label {
    width: 270px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & span {
    }

    & input {
      padding: 5px;
      border-radius: 8px;
      width: 200px;
      height: 40px;
      outline: none;
      border: 2px solid #ededed;
      transition: all 0.3s ease-in-out;

      &:focus {
        border: 2px solid #dddddd;
      }
    }
  }

  & button {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 40px;
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

const SwitchButton = styled.button``;

const Home: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const post = useSelector((state: RootState) => state.postsReducer.post);
  const posts = useSelector((state: RootState) => state.postsReducer.posts);
  const isOpenedModalWindow = useSelector(
    (state: RootState) => state.interfaceReducer.isOpenedModalWindow
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalContent, setModalContent] = useState('authorization');

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      <ContentWrapper>
        <PostBlockWrapper>
          {posts.map((item: IPost) => {
            return (
              <PostBlock
                key={item.id}
                post={item}
                onClickHandler={() => dispatch(fetchPost(item.id))}
                isLarge={false}
              />
            );
          })}
        </PostBlockWrapper>
        {post && <PostBlock post={post} isLarge={true} />}
      </ContentWrapper>
      {isOpenedModalWindow && (
        <ModalWindow>
          <AuthorizationBlock>
            <h2>{modalContent === 'authorization' ? 'Вход' : 'Регистрация'}</h2>
            {modalContent === 'registration' && (
              <label>
                <span>Имя:</span>
                <input
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  type="text"
                />
              </label>
            )}
            <label>
              <span>Email:</span>
              <input
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                type="email"
              />
            </label>
            <label>
              <span>Пароль:</span>
              <input
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                type="password"
              />
            </label>
            <button
              type="submit"
              onClick={async (event) => {
                event.preventDefault();
                if (modalContent === 'authorization') {
                  const response = await dispatch(login({ email, password }));

                  if (!response.payload) {
                    return alert('Не удалось авторизоваться.');
                  }

                  if ('token' in response.payload) {
                    localStorage.setItem('token', response.payload.token);
                    dispatch(setIsOpenedModalWindow(false));
                    setEmail('');
                    setPassword('');
                  }
                } else {
                  const response = await dispatch(
                    register({ name, email, password })
                  );

                  if (!response.payload) {
                    return alert('Не удалось зарегистрироваться.');
                  }
                  if ('token' in response.payload) {
                    localStorage.setItem('token', response.payload.token);
                    dispatch(setIsOpenedModalWindow(false));
                    setName('');
                    setEmail('');
                    setPassword('');
                  }
                }
              }}
            >
              {modalContent === 'authorization'
                ? 'Войти'
                : 'Зарегистрироваться'}
            </button>
            <SwitchButton
              onClick={(event) => {
                event.preventDefault();
                modalContent === 'authorization'
                  ? setModalContent('registration')
                  : setModalContent('authorization');
              }}
            >
              {modalContent === 'authorization'
                ? 'Нет аккаунта? Зарегистрируйтесь!'
                : 'Уже есть аккаунт? Авторизуйтесь!'}
            </SwitchButton>
          </AuthorizationBlock>
        </ModalWindow>
      )}
    </>
  );
};

export default Home;
