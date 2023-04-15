import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException, WsResponse } from "@nestjs/websockets";
import { Server, Socket } from "socket.io"

@WebSocketGateway(8000, { cors: true })
export class IOevents implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  private readonly socket: Server;

  public handleDisconnect(client: Socket) {
    const { authorization } = client.handshake.headers;
    if (!authorization && authorization !== "Hell") {
      throw new WsException("You are not auth")
    }
    console.log(`User with id: ${client.id} was disconnect...`);
  };

  public handleConnection(client: Socket) {
    console.log(`User with id: ${client.id} was connect...`);
  };

  @SubscribeMessage("sendMessage")
  public getMessage(@MessageBody() body: any, client: Socket): WsResponse<string> {
    console.log(client);
    return { event: "GateAwayMessage", data: body }
  }

};
