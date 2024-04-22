import App from '@/app';
import validateEnv from '@utils/validateEnv';
import 'dotenv/config';
import { SocketRoute } from './socket/socket.route';
import { YoutubeRoute } from './youtube/youtube.route';

validateEnv();
const youtubeRoute = new YoutubeRoute();
const socketRoute = new SocketRoute();
export const app = new App([youtubeRoute, socketRoute]);
app.listen();

