import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import User from '../database/models/User.js';
import AppDataSource from '../database/connection.js';

config();

class UserController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ email });
      if (!user) {
        return res.status(500).json({ message: 'Неверный логин или пароль' });
      }

      const isEqual = await bcrypt.compareSync(password, user.passwordHash);
      if (!isEqual) {
        return res.status(500).json({ message: 'Неверный логин или пароль' });
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, { expiresIn: '24h' });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: 'Ошибка при авторизации.' });
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userRepository = AppDataSource.getRepository(User);
      const user = userRepository.create({ name, email, passwordHash: hashedPassword });
      const newUser = await AppDataSource.getRepository(User).save(user);

      const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY as string, { expiresIn: '24h' });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: 'Ошибка при регистрации.' });
    }
  }
}

export default UserController;
