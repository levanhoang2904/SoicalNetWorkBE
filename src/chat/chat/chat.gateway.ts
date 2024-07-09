import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger, Module } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { CommentService } from 'src/modules/comment/comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from 'src/schema/comment/comment.schema';
import { CommentModule } from 'src/modules/comment/comment.module';
@WebSocketGateway({
  cors: { origin: 'http://localhost:3001', credentials: true },
})
export class ChatGateway {
  private logger: Logger = new Logger('ChatGateway');

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload): void {
    this.logger.log(
      `Message from client ${client.id}: ${payload.id}, ${payload.message},  ${payload.toId}`,
    );
    this.server.emit('message', payload);
  }

  @SubscribeMessage('comment')
  handleComment(client: Socket, payload): void {
    this.logger.log(`Comment from client ${client.id}: ${payload.idPost}`);
    this.server.emit('comment', payload);
  }

  @SubscribeMessage('like')
  handleLike(client: Socket, payload): void {
    this.logger.log(`Like from client ${client.id}: ${payload.status}`);
    this.server.emit('like', payload);
  }

  @SubscribeMessage('notifiReact')
  handleNotifiReact(client: Socket, payload): void {
    this.logger.log(`notifiReact from client ${client.id}: ${payload.idUser}`);
    this.server.emit('notifiReact', payload);
  }
}
