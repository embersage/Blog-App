import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import User from '../database/models/User.js';
import AppDataSource from '../database/connection.js';

config();

class UserController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await AppDataSource.getRepository(User).findOneBy({ email });
    if (!user) {
      return res.json({ message: 'Неверный логин или пароль' });
    }

    const isEqual = await bcrypt.compareSync(password, user.passwordHash);
    if (!isEqual) {
      return res.json({ message: 'Неверный логин или пароль' });
    }
    const { passwordHash, ...userData } = user;
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, { expiresIn: '24h' });

    return res.json({ userData, token });
  }

  static async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = AppDataSource.getRepository(User).create({ name, email, passwordHash: hashedPassword });
    const newUser = await AppDataSource.getRepository(User).save(user);
    const { passwordHash, ...userData } = newUser;
    const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY as string, { expiresIn: '24h' });

    return res.json({ userData, token });
  }
}

export default UserController;
