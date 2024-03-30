import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Relation } from 'typeorm';
import Post from './Post.js';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @OneToMany(() => Post, (post) => post.user)
  posts!: Relation<Post>[];
}

export default User;
