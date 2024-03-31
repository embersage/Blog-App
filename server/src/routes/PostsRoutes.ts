import { Router } from 'express';
import PostController from '../controllers/PostController.js';
import checkAuth from '../middlewares/checkAuth.js';

class PostsRoutes {
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', PostController.getAll);
    this.router.get('/:id', PostController.getOne);
    this.router.post('/', checkAuth, PostController.create);
    this.router.patch('/:id', checkAuth, PostController.edit);
    this.router.delete('/:id', checkAuth, PostController.delete);
  }
}

export default new PostsRoutes().router;
