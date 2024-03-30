import { Request, Response } from 'express';
import Post from '../database/models/Post.js';
import AppDataSource from '../database/connection.js';

class PostController {
  static async getAll(req: Request, res: Response) {
    return res.json({ message: 'getAll' });
  }

  static async getOne(req: Request, res: Response) {
    const { id } = req.params;

    const postRepository = AppDataSource.getRepository(Post);
    const post = await postRepository.findOneBy({
      id,
    });

    return res.json(post);
  }

  static async create(req: Request, res: Response) {
    return res.json({ message: 'create' });
  }

  static async edit(req: Request, res: Response) {
    return res.json({ message: 'edit' });
  }

  static async delete(req: Request, res: Response) {
    return res.json({ message: 'delete' });
  }
}

export default PostController;
