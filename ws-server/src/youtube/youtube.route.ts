import { Router } from 'express';
import { Routes } from './types';
import YoutubeController from './youtube.controller';

export class YoutubeRoute implements Routes {
  public path = '/youtube';
  public router = Router();
  public controller = new YoutubeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.controller.getVideos);
    this.router.get(`${this.path}`, this.controller.isOk);
  }
}
