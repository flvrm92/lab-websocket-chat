import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { MessagesService } from '../services/MessagesService';


io.on('connect', async (socket) => {
  const cnnServices = new ConnectionsService();
  const messagesService = new MessagesService();

  const allConnectionWithoutAdmin = await cnnServices.findAllWithoutAdmin();

  io.emit('adminListAllUsers', allConnectionWithoutAdmin);

  socket.on('adminListMessagesByUser', async (params, callback) => {
    const { userId } = params;

    const allMessages = await messagesService.listByUser(userId);

    callback(allMessages);
  });

  socket.on('adminSendMessage', async (params) => {
    const { userId, text } = params;

    await messagesService.create({
      text,
      userId,
      adminId: socket.id
    });

    const { socketId } = await cnnServices.findByUserId(userId);
    
    io.to(socketId).emit('adminSendToClient', {
      text,
      socketId
    });
    
  });
});