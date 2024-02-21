import { Router } from 'express';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';

export function userRouter(): Router {
  const router = Router();

  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  router.post('/', (req, res) => userController.createUser(req, res));
  router.get('/email/:email', (req, res) =>
    userController.getUserByEmail(req, res)
  );
  router.get('/', (req, res) => userController.getAllUsers(req, res));
  router.put('/', (req, res) => userController.updateUser(req, res));

  return router;
}
