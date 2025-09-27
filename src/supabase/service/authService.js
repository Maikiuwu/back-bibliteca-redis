import { client } from '../client.js'

// REGISTRO
export async function signUp(email, password) {
  const { data, error } = await client.auth.signUp({
    email,
    password
  })
  if (error) throw error
  return data
}

// LOGIN
export async function signIn(email, password) {
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password
  })
  if (error) throw error
  return data
}

// LOGOUT
export async function signOut() {
  const { error } = await client.auth.signOut()
  if (error) throw error
  return true
}

// SESIÓN ACTUAL
export async function getSession() {
  const { data, error } = await client.auth.getSession()
  if (error) throw error
  return data.session
}