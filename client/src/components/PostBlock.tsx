import { FC, forwardRef } from 'react';
import styled from 'styled-components';
import { BsEyeFill } from 'react-icons/bs';
import IPost from '../models/IPost';

const PostBlockWrapper = styled.div<{ isLarge: boolean }>`
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
  position: ${(props) => (props.isLarge ? 'sticky' : 'static')};
  top: ${(props) => (props.isLarge ? '100px' : '')};

  & h2 {
    margin: 0;
    padding: 0;

    font-weight: 600;
  }

  & img {
    width: 400px;
    border-radius: 20px;
  }

  & p {
    padding: 5px;
    max-width: 500px;
    max-height: 200px;
    overflow: auto;
    text-align: justify;
  }

  &:hover {
    cursor: ${(props) => (props.isLarge ? '' : 'pointer')};
    transform: ${(props) => (props.isLarge ? '' : 'scale(1.05)')};
    box-shadow: ${(props) => (props.isLarge ? '' : '0px 0px 25px #eeeeee')};
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
  ref?: React.Ref<HTMLDivElement>;
  post: IPost;
  onClickHandler?: () => void;
  isLarge: boolean;
}

export type Ref = HTMLDivElement;

const PostBlock = forwardRef<Ref, IProps>((props, ref) => {
  const { post, onClickHandler, isLarge } = props;

  return (
    <PostBlockWrapper ref={ref} onClick={onClickHandler} isLarge={isLarge}>
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
});

export default PostBlock;
