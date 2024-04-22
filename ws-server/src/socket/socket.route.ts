import { Routes } from '@/youtube/types';
import { Router } from 'express';
import { SocketController } from './socket.controller';

export class SocketRoute implements Routes {
  public path = '/';
  public router = Router();
  public indexController = new SocketController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
  }
}
