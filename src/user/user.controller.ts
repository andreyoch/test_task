import { Request, Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDTO, GetUserByEmailDTO, UpdateUserDTO } from './user.dto';

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const createUserDTO: CreateUserDTO = req.body;
      const user = await this.userService.createUser(createUserDTO);
      return res.status(201).json(user);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An unknown error occurred';
      return res.status(500).json({ message });
    }
  }

  async getUserByEmail(req: Request, res: Response): Promise<Response> {
    try {
      const getUserByEmailDTO: GetUserByEmailDTO = { email: req.params.email };
      const user = await this.userService.getUserByEmail(getUserByEmailDTO);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(user);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An unknown error occurred';
      return res.status(500).json({ message });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An unknown error occurred';
      return res.status(500).json({ message });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const updateDTO: UpdateUserDTO = req.body;
      const updatedUser = await this.userService.updateUser(updateDTO);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(updatedUser);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An unknown error occurred';
      return res.status(500).json({ message });
    }
  }
}
