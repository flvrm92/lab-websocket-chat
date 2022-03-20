import { getCustomRepository } from "typeorm"
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository"

interface IUsersCreate {
    email: string
}

class UsersService {
    private usersRepository: UsersRepository;
    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    async create({ email }: IUsersCreate) {
        const user = await this.usersRepository.findOne({
            email
        });

        if (user) {
            return user;
        } 

        const newUser = this.usersRepository.create({email});
        await this.usersRepository.save(newUser);
        return newUser;        
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.usersRepository.findOne({
            where: {email}
        });

        return user;
    }
}

export {
    UsersService
}