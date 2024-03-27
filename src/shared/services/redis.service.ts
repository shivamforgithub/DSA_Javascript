import Redlock, { Lock } from 'redlock';
import { Redis } from 'ioredis';
import { ENV_PARAMS } from '../../../config/default';
import { Logger } from '../logger/logger.service';

class RedisServiceImpl {
  private redisClient;
  private redlock: Redlock;

  public async getClient() {
    if (this.redisClient) {
      return this.redisClient;
    }

    this.redisClient = await new Redis(ENV_PARAMS.redisConnectionString);
    this.redlock = new Redlock([this.redisClient], {
      driftFactor: 0.01,
      retryCount: 0,
    });
    return this.redisClient;
  }

  public async setKey(
    name: string,
    value: string,
    expireInSeconds: number = null,
  ) {
    const client = await this.getClient();
    const key = this.getKeyWithEnvPrefix(name);

    if (expireInSeconds !== null) {
      return client.set(key, value, 'EX', expireInSeconds);
    }

    return client.set(key, value);
  }

  public async getKey(name: string) {
    const client = await this.getClient();
    const key = this.getKeyWithEnvPrefix(name);
    return client.get(key);
  }

  public async acquireLockOnKey(name: string, duration: number) {
    await this.getClient();
    const key = this.getKeyWithEnvPrefix(name);
    const lock = this.redlock.acquire([key], duration);
    return lock;
  }

  public async releaseLock(lock: Lock) {
    await lock.release();
  }

  private getKeyWithEnvPrefix(name: string) {
    return `${ENV_PARAMS.env}-light-api-${name}`;
  }

  public async delKey(name: string) {
    const client = await this.getClient();
    const key = this.getKeyWithEnvPrefix(name);
    return client.del(key);
  }

  public async generateSequentialId(prefix = '', start = 0) {
    const redis = await this.getClient();
    try {
      const result = await redis.multi().incr(prefix).exec();
      const newId = result[0][1];
      const nextId = start + newId;
      const sequentialId = prefix + nextId;

      return sequentialId;
    } catch (error) {
      console.error(`Error generating sequential ID`, error);
      throw error;
    }
  }
}

export const RedisService = new RedisServiceImpl();
