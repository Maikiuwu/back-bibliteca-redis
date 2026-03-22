import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: 'baaGuQCsKGylN0Gg1knirP7FMMOs9VZ4',
    socket: {
        host: 'redis-15877.c322.us-east-1-2.ec2.cloud.redislabs.com',
        port: 15877
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
