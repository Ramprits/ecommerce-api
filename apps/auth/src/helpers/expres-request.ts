import { Request } from 'express';
import { LoginRequest } from '../users/dto/login-request.dto';

export interface UserRequest extends Request {
  user: LoginRequest;
}
