import { YoutubeService } from "@/youtube/youtube.service";
import { NextFunction, Request, Response } from "express";

export class YoutubeController {
  public service = new YoutubeService();

  public getVideos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ids: string = req.query.id as string;
      const id = ids.split(',');
      const getVideosData = await this.service.findVideoById(id);
      if (getVideosData.data) {
        res.status(200).json({ data: getVideosData.data.items, message: 'success' });
      } else {
        res.status(409).json({ error: true, message: 'Video not found' });
      }
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
