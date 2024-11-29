import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/repositories/user.repository';

@Injectable()
export class SequelizeUserRepository implements UserRepository {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) { }

    async create(user: User): Promise<User> {
        return this.userModel.create(user);
    }

    async findOne(email: string): Promise<User | null> {
        console.log('a');
        return this.userModel.findOne({ where: { email } });
    }
}
