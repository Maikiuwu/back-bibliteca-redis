import { createClient } from 'redis'
import dotenv from 'dotenv'
dotenv.config()

export const client = createClient({
    username: process.env.USERNAME_REDIS,
    password: process.env.PASSWORD_REDIS,
    socket: {
        host: process.env.HOST_REDIS,
        port: Number(process.env.PRT_REDIS)
    }
})

client.on('error', err => console.log('Redis Client Error', err))

/*
await client.connect();

await client.set('foo', 'bar');
const result = await client.get('foo');
console.log(result)  // >>> bar
*/
