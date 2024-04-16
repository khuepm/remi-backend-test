import { YoutubeService } from "@/youtube/youtube.service";
import { NextFunction, Request, Response } from "express";

export class YoutubeController {
  public service = new YoutubeService();

  public getVideos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.body;

      const getVideosData = await this.service.findVideoById(data.videoIds);

      res.status(200).json({ data: getVideosData, message: 'getVideos' });
    } catch (error) {
      next(error);
    }
  };

  public ping = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ data: [], message: 'pong' });
    } catch (error) {
      next(error);
    }
  };
}
