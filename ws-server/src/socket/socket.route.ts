import { Router } from 'express';
import { SocketController } from './socket.controller';
import { Routes } from '@/server';

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
