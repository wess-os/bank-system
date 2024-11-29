import { User } from '../../domain/entities/user.entity';

export interface UserRepository {
    create(user: User): Promise<User>;
    findOne(email: string): Promise<User>;
}
