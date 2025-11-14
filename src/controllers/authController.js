import { json } from 'express'
import { client } from '../redisConection.js'


export async function Login(req, res) {
  try {
    const { body } = req

    const resp = await client.get(body.email)
    
    //si existe en redis lo devuelve
    if (resp) {
      console.log("el usuario ya existe en redis")
      const redis = JSON.parse(resp)
      redis.true = "RESREDIS"
      console.log(redis)
      return res.json(JSON.stringify(redis))
    }
    
    const data = JSON.stringify(body)
    client.set(body.email, data)
    console.log("el usuario no existe en redis, se crea")
    return res.json(data)

  } catch (err) {
    console.error(err)
    res.status(401).json({ error: err.message })
  }
}

export async function Delete(req, res) {
try {
    // Escanea todas las claves en Redis
    let cursor = '0'
    let deleted = 0
    do {
      const reply = await client.scan(cursor)
      cursor = reply.cursor
      const keys = reply.keys.filter(k => k.includes('@')) // solo emails
      if (keys.length > 0) {
        await client.del(keys)
        deleted += keys.length
      }
    } while (cursor !== '0')
    res.json({ deleted })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}

/*
async function Register (req, res) {
  try {
    const { email, password } = req.body
    const data = await signUp(email, password)
    res.status(201).json({ user: data.user })
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: err.message })
  }
}

async function Home (req, res) {
  try {
    const session = await getSession()
    res.status(200).json({ session })
  } catch (err) {
    console.error(err)
    res.status(401).json({ error: err.message })
  }
}*/



