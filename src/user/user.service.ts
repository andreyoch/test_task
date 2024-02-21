import bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { CreateUserDTO, GetUserByEmailDTO, UpdateUserDTO } from './user.dto';
import { IUser } from './user.interface';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(user: CreateUserDTO): Promise<IUser> {
    try {
      const existingUser = await this.userRepository.getUserByEmail({
        email: user.email
      });
      if (existingUser) {
        throw new Error('User with the given email already exists');
      }
      const saltRounds = parseInt(process.env.SALT_ROUNDS || '') || 10;

      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      const newUser = { ...user, password: hashedPassword };

      return await this.userRepository.createUser(newUser);
    } catch (error) {
      console.error('Error creating user in UserService:', error);
      throw error;
    }
  }

  async getUserByEmail(dto: GetUserByEmailDTO): Promise<IUser | null> {
    try {
      return await this.userRepository.getUserByEmail(dto);
    } catch (error) {
      console.error('Error fetching user by email in UserService:', error);
      throw error;
    }
  }

  async getAllUsers(): Promise<IUser[]> {
    try {
      return await this.userRepository.getAllUsers();
    } catch (error) {
      console.error('Error fetching all users in UserService:', error);
      throw error;
    }
  }

  async updateUser(dto: UpdateUserDTO): Promise<IUser | null> {
    try {
      const existingUser = await this.userRepository.getUserByEmail({
        email: dto.email
      });
      if (!existingUser) {
        throw new Error('User does not exist');
      }
      if (dto.password) {
        const saltRounds = parseInt(process.env.SALT_ROUNDS || '') || 10;
        dto.password = await bcrypt.hash(dto.password, saltRounds);
      }
      return await this.userRepository.updateUser(dto);
    } catch (error) {
      console.error('Error updating user in UserService:', error);
      throw error;
    }
  }
}
