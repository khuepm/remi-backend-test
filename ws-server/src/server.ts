import App from '@/app';
import validateEnv from '@utils/validateEnv';
import { google } from "googleapis";
import { Router } from 'express';
import { YoutubeRoute } from './youtube/youtube.route';

// validateEnv();
const app = new App([new YoutubeRoute()]);
app.listen();


export interface Routes {
  path?: string;
  router: Router;
}

export const youtubeService = google.youtube({
  version: "v3",
  auth: process.env.GOOGLE_API_KEY || ""
})
