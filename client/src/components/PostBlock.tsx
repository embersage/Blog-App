import { FC } from 'react';
import styled from 'styled-components';
import { BsEyeFill } from 'react-icons/bs';
import IPost from '../models/IPost';

const PostBlockWrapper = styled.div<{ isLarge: boolean }>`
  margin: 0;
  padding: 20px;
  width: ${(props) => (props.isLarge ? '600px' : '500px')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 10px;
  box-shadow: 0px 0px 10px #eeeeee;
  border-radius: 20px;
  transition: all 0.3s ease-in-out;
  font-family: 'Fira Sans', sans-serif;
  font-weight: 400;
  font-style: normal;
  position: ${(props) => (props.isLarge ? 'sticky' : 'static')};
  top: ${(props) => (props.isLarge ? '20px' : '')};

  & h2 {
    margin: 0;
    padding: 0;
    font-family: 'Fira Sans', sans-serif;
    font-weight: 600;
    font-style: normal;
  }

  & img {
    width: 400px;
    border-radius: 20px;
  }

  & p {
    margin: 0;
    padding: 0;
    width: 400px;
    text-align: justify;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    box-shadow: 0px 0px 25px #eeeeee;
  }
`;

const AdditionalInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 10px;
  }
`;

interface IProps {
  post: IPost;
  onClickHandler?: () => void;
  isLarge: boolean;
}

const PostBlock: FC<IProps> = (props) => {
  const { post, onClickHandler, isLarge } = props;

  return (
    <PostBlockWrapper onClick={onClickHandler} isLarge={isLarge}>
      <img
        src={post.image ? post.image : '../assets/image-placeholder.gif'}
        alt={post.image}
      />
      <h2>{post.title}</h2>
      {isLarge && <p>{post.text}</p>}
      <AdditionalInfo>
        <span>
          {post.views} <BsEyeFill />
        </span>
        <span>{post.createdAt.toString()}</span>
      </AdditionalInfo>
    </PostBlockWrapper>
  );
};

export default PostBlock;
