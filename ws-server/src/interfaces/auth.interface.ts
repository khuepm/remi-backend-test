import { User } from '@/app';
import { Request } from 'express';

export type DataStoredInToken = {
  id?: number;
} & User;

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
