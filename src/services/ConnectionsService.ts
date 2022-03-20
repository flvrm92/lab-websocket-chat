import { getCustomRepository, Repository } from "typeorm"
import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from '../repositories/ConnectionsRepository';

interface IConnectionCreate {
	id?: string;
	socketId: string;
	userId: string;
	adminId?: string
}

class ConnectionsService {
	private connectionsRepository: Repository<Connection>;

	constructor() {
		this.connectionsRepository = getCustomRepository(ConnectionsRepository);
	}

	async create({ id, socketId, userId, adminId }: IConnectionCreate) {
		const connection = this.connectionsRepository.create({
			id,
			socketId,
			userId,
			adminId
		});

		await this.connectionsRepository.save(connection);

		return connection;
	}

	async findByUserId(userId: string) {
		const connection = await this.connectionsRepository.findOne({
			userId
		});

		return connection;
	}

	async findAllWithoutAdmin() {
		const connection = await this.connectionsRepository.find({
			where: { adminId: null },
			relations: ['User']
		});

		return connection;
	}
}

export {
	ConnectionsService
}