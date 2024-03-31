import { Request, Response } from 'express';
import Post from '../database/models/Post.js';
import AppDataSource from '../database/connection.js';

class PostController {
  static async getAll(req: Request, res: Response) {
    try {
      const postRepository = AppDataSource.getRepository(Post);
      const posts = await postRepository.find();

      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({ message: 'Ошибка при получении ресурсов.' });
    }
  }

  static async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const postRepository = AppDataSource.getRepository(Post);
      const post = await postRepository.findOneBy({ id });

      if (post) {
        post.views++;
        await postRepository.save(post);

        return res.status(200).json(post);
      }
    } catch (error) {
      return res.status(404).json({ message: 'Ошибка при получении ресурса.' });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const { text } = req.body;

      const postRepository = AppDataSource.getRepository(Post);

      const post = postRepository.create({ text, user: userId });
      const createdPost = await AppDataSource.getRepository(Post).save(post);

      return res.status(201).json(createdPost);
    } catch (error) {
      return res.status(500).json({ message: 'Ошибка при получении ресурса.' });
    }
  }

  static async edit(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { text } = req.body;

      const postRepository = AppDataSource.getRepository(Post);
      const post = await postRepository.findOneBy({ id });

      if (post) {
        post.text = text;
        const updatedPost = await postRepository.save(post);

        return res.status(200).json(updatedPost);
      }
    } catch (error) {
      return res.status(500).json({ message: 'Ошибка при редактировании ресурса.' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const postRepository = AppDataSource.getRepository(Post);
      const post = await postRepository.delete(id);

      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ message: 'Ошибка при удалении ресурса.' });
    }
  }
}

export default PostController;
