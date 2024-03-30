import { Router } from 'express';
import UserController from '../controllers/UserController.js';

class UsersRoutes {
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/login', UserController.login);
    this.router.post('/register', UserController.register);
  }
}

export default new UsersRoutes().router;
