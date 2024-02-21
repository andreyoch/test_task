import Redis from 'ioredis';

const redis = new Redis({
  port: 6379,
  host: process.env.REDIS_HOST
});

export default redis;
