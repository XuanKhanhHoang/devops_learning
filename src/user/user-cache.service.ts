import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UserCacheKey } from './user-cache-key.enum';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getUser(id: number): Promise<User | undefined> {
    return this.cacheManager.get<User>(`user_${id}`);
  }

  async setUser(id: number, user: User, ttlMs: number = 2 * 60 * 1000): Promise<void> {
    await this.cacheManager.set(`user_${id}`, user, ttlMs);
  }

  async clearUser(id: number): Promise<void> {
    await this.cacheManager.del(`user_${id}`);
  }

  async clearUserList(): Promise<void> {
    await this.cacheManager.del(UserCacheKey.USER_LIST);
  }
}
