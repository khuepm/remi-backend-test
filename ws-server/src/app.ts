import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import http from 'http';
import { Server } from 'socket.io';
import { SocketService } from '@/socket/socket.service';
import { Routes } from './server';

export type User = {
  name?: string;
  id: string;
};

export type MessageType = 'notifications';
export type Message = {
  eventName: string;
  fromUser: User;
  toUser: User;
  payload: { [key: string]: any };
};

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public server: http.Server;
  public io;

  constructor(routes: Routes[]) {
    this.app = express();
    this.server = http.createServer(this.app);
    this.env = process.env.NODE_ENV || 'development';
    this.port = process.env.PORT || 3000;
    this.initializeRoutes(routes);

    this.io = new Server(this.server, {
      pingInterval: 10000,
      pingTimeout: 50000,
      allowEIO3: true,
      cors: {
        origin: process.env.ORIGIN || "*",
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-type', 'Accept', 'X-Access-Token', 'X-Key'],
      },
    });

    this.initializeMiddlewares();
    this.initializeErrorHandling();
  }

  public listen() {
    new SocketService(this.io);
    this.server.listen(process.env.WS_PORT || 3020);
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getWS() {
    return this.io;
  }

  public getServer() {
    return this.app;
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeMiddlewares() {
    this.app.use(morgan(process.env.LOG_FORMAT || "dev", { stream }));
    this.app.use(cors({ origin: process.env.ORIGIN || "*", credentials: Boolean(process.env.CREDENTIALS) || true }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    // this.io.use(wrapSocket(authMiddleware));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
