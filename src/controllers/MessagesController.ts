import { Request, Response } from 'express';
import { MessagesService } from '../services/MessagesService';

class MessagesController {
    async create(request: Request, response: Response) {
        const { adminId, text, userId } = request.body;

        const messageService = new MessagesService();

        try {
            const message = await messageService.create({
                adminId,
                text,
                userId
            });

            return response.json(message);
        } catch(error) {
            return response.status(400).json({
                message: error.message
            });
        }
    }

    async showByUser(request: Request, response: Response) {
        const { id } = request.params;

        const messageService = new MessagesService();

        const list = await messageService.listByUser(id);

        return response.json(list);
    }
}

export {
    MessagesController
}