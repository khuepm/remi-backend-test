import { Request, Response, NextFunction } from "express";

export class SocketController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.socket);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}
