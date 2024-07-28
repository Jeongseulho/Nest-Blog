import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = AuthCredentialsDto;
    const user = this.create({ username, password });
    await this.save(user);
  }
}
