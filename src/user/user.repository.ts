import { query } from '../db/db';
import { IUser } from './user.interface';
import { CreateUserDTO, GetUserByEmailDTO, UpdateUserDTO } from './user.dto';

export class UserRepository {
  async createUser(user: CreateUserDTO): Promise<IUser> {
    try {
      const { name, lastname, email, login, phone, password } = user;
      const queryString = `
        INSERT INTO users (name, lastname, email, login, password, phone)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, name, lastname, email, login, phone;
      `;
      const values = [name, lastname, email, login, password, phone];
      const result = await query<IUser & { id: number }>(queryString, values);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = result.rows[0];
      return rest;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  async getUserByEmail(dto: GetUserByEmailDTO): Promise<IUser | null> {
    try {
      const { email } = dto;
      const queryString = `SELECT name, lastname, email, login, phone FROM users WHERE email = $1;`;
      const result = await query<IUser>(queryString, [email]);
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw new Error('Failed to fetch user by email');
    }
  }

  async getAllUsers(): Promise<IUser[]> {
    try {
      const queryString = `SELECT name, lastname, email, login, phone FROM users;`;
      const result = await query<IUser>(queryString);
      return result.rows;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw new Error('Failed to fetch all users');
    }
  }

  async updateUser(dto: UpdateUserDTO): Promise<IUser | null> {
    try {
      const { email, name, lastname, login, phone } = dto;
      if (!email) {
        throw new Error('Email is required to update the user.');
      }

      const setClause = [];
      const values = [];

      if (name !== undefined) {
        setClause.push(`name = $${values.push(name)}`);
      }
      if (lastname !== undefined) {
        setClause.push(`lastname = $${values.push(lastname)}`);
      }
      if (login !== undefined) {
        setClause.push(`login = $${values.push(login)}`);
      }
      if (phone !== undefined) {
        setClause.push(`phone = $${values.push(phone)}`);
      }

      if (setClause.length === 0) {
        throw new Error('At least one field must be provided for update.');
      }

      const queryString = `
      UPDATE users
      SET ${setClause.join(', ')}
      WHERE email = $${values.push(email)}
      RETURNING id, name, lastname, email, login, phone;
    `;

      const result = await query<IUser>(queryString, values);

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0];
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }
}
