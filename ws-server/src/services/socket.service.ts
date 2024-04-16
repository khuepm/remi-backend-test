import { Message } from '@/app';
import { authJWTMiddleware } from '@middlewares/auth.middleware';
import wrapSocket from '@middlewares/socketAuth.middleware';
// import authMiddleware from '@/middlewares/auth.middleware';
// import wrapSocket from '@/middlewares/socketAuth.middleware';
import { logger } from '@utils/logger';
import { isEmpty } from 'class-validator';
export class SocketService {
  private io;
  constructor(newio) {
    this.io = newio;
    this.onMessageReceived();
  }

  public onMessageReceived(): void {
    const admin = this.io.of('/admin');
    const user = this.io.of('/user');

    admin.on('connection', socket => {
      socket.on('join-room', userData => {
        if (isEmpty(userData)) return;
        logger.info(`join admin: ${JSON.stringify(userData)}`);
        socket.join(userData.address);
      });

      socket.on('authentication', authData => {
        console.log(authData);
      });

      socket.on('leave-room', userData => {
        if (isEmpty(userData)) return;
        socket.leave(userData.address);
      });

      socket.on('send-message', (message: Message) => {
        if (isEmpty(message)) return;
        console.log('server receive message from /admin', message);
        user.in(message.toUser.id).emit('notifications', message);
      });

      socket.on('disconnect', () => {
        socket.disconnect();
        logger.info(`event: disconnect`);
      });

      socket.on('ping', () => {
        const date = new Date().toISOString();
        socket.emit('pong', 'date=' + date);
      });

      socket.on('broadcast-message', data => {
        user.emit('notifications', data);
      });
    });

    user.on('connection', socket => {
      socket.on('join-room', userData => {
        if (isEmpty(userData)) return;
        logger.info(`join user: ${JSON.stringify(userData)}`);
        socket.join(userData.address);
      });

      socket.on('leave-room', userData => {
        if (isEmpty(userData)) return;
        socket.leave(userData.address);
      });

      socket.on('disconnect', () => {
        socket.disconnect();
        logger.info(`event: disconnect`);
      });

      socket.on('ping', () => {
        const date = new Date().toISOString();
        socket.emit('pong', 'date=' + date);
      });
    });
  }
}
