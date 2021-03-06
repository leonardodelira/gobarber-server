import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateAvatarUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUserService = new CreateUserService();

  const { password: _, ...user } = await createUserService.execute({
    name,
    email,
    password,
  });

  return res.json(user);
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (req, res) => {
  const updatedUserAvatar = new UpdateUserAvatarService();

  const user = await updatedUserAvatar.execute({
    user_id: req.user.id,
    avatarFileName: req.file.filename,
  });

  return res.json(user);
});

export default usersRouter;
