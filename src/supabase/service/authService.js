import { client } from '../client.js'

console.log("entro a authService.js")

// REGISTRO
export async function signUp(email, password, nombre, apellido, cc, roles) {
  console.log("entro a signUp.js")
  console.log("Registering user with email:", email)

  // 1. Registrar usuario en auth.users
  const { data, error } = await client.auth.signUp({
    email,
    password
  })

  if (error) throw error

  const user = data.user // contiene el id (uuid) del usuario creado

  // 2. Insertar datos adicionales en tu tabla usuario
  const { error: insertError } = await client
    .from("usuario")
    .insert([{
      id: user.id,        // mismo uuid que auth.users
      nombre,
      apellido,
      cc,
      roles: parseInt(roles) // asegurar número
    }])

  if (insertError) throw insertError

  return {
    user,
    message: "Usuario registrado correctamente"
  }
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
