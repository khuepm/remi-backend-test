import { HttpException } from '@exceptions/HttpException';
import { youtubeService } from './types';

export class YoutubeService {

  public async findVideoById(videoIds: string[]) {
    const foundVideo = await youtubeService.videos.list({
      part: ['snippet'],
      id: videoIds
    })
    if (!foundVideo) throw new HttpException(409, "Video doesn't exist");

    return foundVideo;
  }
}

