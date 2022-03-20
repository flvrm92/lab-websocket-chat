import { Socket } from 'socket.io';
import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { UsersService } from '../services/UsersService';
import { MessagesService } from '../services/MessagesService';

interface IParams {
	text: string,
	email: string
}

io.on('connect', (socket: Socket) => {
	const connectionsService = new ConnectionsService();
	const usersService = new UsersService();
	const messagesService = new MessagesService();

	socket.on('clientFirstAccess', async (params) => {
		const socketId = socket.id;
		const { text, email } = params as IParams;
		let userId = null;

		const user = await usersService.findByEmail(email);

		if (!user) {
			const newUser = await usersService.create({ email });
			await connectionsService.create({
				socketId,
				userId: newUser.id
			});

			userId = newUser.id;
		} else {
			const connection = await connectionsService.findByUserId(user.id);

			if (!connection) {
				await connectionsService.create({
					socketId,
					userId: user.id
				});
			} else {
				connection.socketId = socketId;
				await connectionsService.create(connection);
			}

			userId = user.id;
		}

		await messagesService.create({
			text,
			userId
		});

		const allMessages = await messagesService.listByUser(userId);

		socket.emit('clientListAllMessages', allMessages);
	});
});