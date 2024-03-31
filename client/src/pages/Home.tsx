import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../store';
import { fetchPost, fetchPosts } from '../store/reducers/postsSlice';
import PostBlock from '../components/PostBlock';

const ContentWrapper = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  column-gap: 20px;
`;

const PostBlockWrapper = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 20px;
`;

const Home: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const post = useSelector((state: RootState) => state.postsReducer.post);
  const posts = useSelector((state: RootState) => state.postsReducer.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <ContentWrapper>
      <PostBlockWrapper>
        {posts.map((item) => {
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
  );
};

export default Home;
