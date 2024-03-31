interface IPost {
  id: string;
  title: string;
  text: string;
  views: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export default IPost;
