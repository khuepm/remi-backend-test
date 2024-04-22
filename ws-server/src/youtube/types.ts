import { Router } from 'express';
import { google } from "googleapis";

export interface Routes {
  path?: string;
  router: Router;
}

export const youtubeService = google.youtube({
  version: "v3",
  auth: process.env.GOOGLE_API_KEY || "AIzaSyB1G5ZwRM4Po4hx6C7o_7Se-OgAgXQQImc"
})
