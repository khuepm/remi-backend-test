import App from '@/app';
import validateEnv from '@utils/validateEnv';
import 'dotenv/config';
import { Router } from 'express';
import { google } from "googleapis";
import { SocketRoute } from './socket/socket.route';
import { YoutubeRoute } from './youtube/youtube.route';

validateEnv();
const youtubeRoute = new YoutubeRoute();
const socketRoute = new SocketRoute();
const app = new App([youtubeRoute, socketRoute]);
app.listen();


export interface Routes {
  path?: string;
  router: Router;
}

export const youtubeService = google.youtube({
  version: "v3",
  auth: process.env.GOOGLE_API_KEY || ""
})
