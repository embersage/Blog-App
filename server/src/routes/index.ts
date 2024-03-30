import { Router } from 'express';
import UsersRoutes from './UsersRoutes.js';
import PostsRoutes from './PostsRoutes.js';

class Routes {
  router = Router();

  constructor() {
    this.router.use('/users', UsersRoutes);
    this.router.use('/posts', PostsRoutes);
  }
}

export default new Routes().router;
