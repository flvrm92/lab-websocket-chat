import { getCustomRepository } from "typeorm"
import { MessageRepository } from "../repositories/MessagesRepository"

interface IMessageCreate {
	adminId?: string;
	text: string;
	userId: string
}

class MessagesService {
	private messageRepository: MessageRepository;

	constructor() {
		this.messageRepository = getCustomRepository(MessageRepository);
	}

	async create({ adminId, text, userId }: IMessageCreate) {

		const message = this.messageRepository.create({
			adminId,
			text,
			userId
		});

		await this.messageRepository.save(message);

		return message;
	}

	async listByUser(userId: string) {
		const list = await this.messageRepository.find({
			where: { userId },
			relations: ['User']
		});

		return list;
	}
}

export {
	MessagesService
}