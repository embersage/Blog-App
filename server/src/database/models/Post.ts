import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Relation } from 'typeorm';
import User from './User.js';

@Entity()
class Post {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  text!: string;

  @ManyToOne(() => User, (user) => user.posts)
  user!: Relation<User>;
}

export default Post;
