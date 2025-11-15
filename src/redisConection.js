import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: '8lm52KvaBzosoFeVzp1cy0SC64rsoGZv',
    socket: {
        host: 'redis-14101.c323.us-east-1-2.ec2.cloud.redislabs.com',
        port: 14101
    }
});

export { client };

client.on('error', err => console.log('Redis Client Error', err));


await client.connect();
console.log('Connected to Redis');
/*console.log(client.socket.host);

/*
await client.set('foo', 'bar');
const result = await client.get('foo');
console.log(result)  // >>> bar
*/
