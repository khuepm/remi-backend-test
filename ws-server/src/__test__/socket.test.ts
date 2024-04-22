import { createServer } from "node:http";
import { type AddressInfo } from "node:net";
import { Server } from "socket.io";
import { io as ioc } from "socket.io-client";

describe("Test socket service", () => {
  let io, serverSocket, clientSocket;
  const message = 'Someone just shared a Youtube Video';
  
  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = (httpServer.address() as AddressInfo).port;
      console.log(`Serving on port ${port}`);
      clientSocket = ioc(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });
  
  // beforeEach(() => {
  //   jest.setTimeout(60000);
  // })

  afterAll(() => {
    io.close();
    clientSocket.disconnect();
  });

  // Test case to verify if the server receives and handles the message correctly
  test("should receive and handle \"Someone just shared a Youtube Video\"", (done) => {
    // Listen for the server's response to the message
    clientSocket.on(message, (arg) => {
      // Assert that the received message matches the sent message
      expect(arg).toBe("isOK");
      done();
    });
  //   // Send the message to the server
    serverSocket.emit(message, "isOK");
  });

  test("should work with an acknowledgement", (done) => {
    serverSocket.on(message, (cb) => {
      cb("hola");
    });
    clientSocket.emit(message, (arg) => {
      expect(arg).toBe("hola");
      done();
    });
  });

  test("should work with emitWithAck()", async () => {
    serverSocket.on("share", (cb) => {
      cb(message);
    });
    const result = await clientSocket.emitWithAck("share");
    expect(result).toBe(message);
  });

});
