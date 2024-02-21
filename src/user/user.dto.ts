export class CreateUserDTO {
  name: string;
  lastname: string;
  password: string;
  email: string;
  login: string;
  phone: string;
}

export class GetUserByEmailDTO {
  email: string;
}

export class UpdateUserDTO {
  email: string;
  name?: string;
  lastname?: string;
  login?: string;
  phone?: string;
}
