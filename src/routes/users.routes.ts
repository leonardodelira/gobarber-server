import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUserService = new CreateUserService();

    const { password: _, ...user } = await createUserService.execute({
      name,
      email,
      password,
    });

    return res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default usersRouter;
