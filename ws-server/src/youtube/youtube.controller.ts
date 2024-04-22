import { YoutubeService } from "@/youtube/youtube.service";
import { NextFunction, Request, Response } from "express";

 export default class YoutubeController {
  public service = new YoutubeService();

  public getVideos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ids: string = req.query.id as string;
      //TODO: support get multi videos. The specs do not have this req so I skip it :D
      if(ids === undefined){
        res.status(400).json({ error: true, message: 'Missing id parameter' });
        return;
      }
      const getVideosData = await this.service.findVideoById([ids]);
      if (getVideosData.data) {
        const videoDataValid = getVideosData.data.items
        if(videoDataValid.length > 0)
          res.status(200).json({ data: getVideosData.data.items[0], message: 'success' });
        else 
          res.status(200).json({ error: true, message: 'Video not found' });
      } else {
        res.status(409).json({ error: true, message: 'Video not found' });
      }
    } catch (error) {
      next(error);
    }
  };

  public isOk = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ data: [], message: 'OK' });
    } catch (error) {
      next(error);
    }
  };
}
