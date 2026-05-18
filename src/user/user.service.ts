import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserCacheService } from './user-cache.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly userCacheService: UserCacheService,
  ) {}

  list(dtos: any) {
    return this.usersRepository.find({});
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    await this.userCacheService.clearUserList();
    return this.usersRepository.save(user);
  }

  async findOne(id: number) {
    const cachedUser = await this.userCacheService.getUser(id);
    if (cachedUser) {
      return cachedUser;
    }
    const user = await this.usersRepository.findOne({ where: { id } });
    if (user) {
      await this.userCacheService.setUser(id, user);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await Promise.all([
      this.userCacheService.clearUserList(),
      this.userCacheService.clearUser(id),
    ]);
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    await Promise.all([
      this.userCacheService.clearUserList(),
      this.userCacheService.clearUser(id),
    ]);
    return this.usersRepository.delete(id);
  }
}
