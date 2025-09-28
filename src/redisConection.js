
import { createClient } from 'redis';

export const client = createClient({
    username: 'default',
    password: 'MAYiflxHFSCNyTnb5U6BWa9ccqZdOEaT',
    socket: {
        host: 'redis-15690.c281.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 15690
    }
});

client.on('error', err => console.log('Redis Client Error', err));


await client.connect();

await client.set('foo', 'bar');
const result = await client.get('foo');
console.log(result)  // >>> bar

