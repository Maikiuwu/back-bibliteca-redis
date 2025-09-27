import { signUp, signIn, getSession } from '../supabase/service/authService.js'

async function Login (req, res) {
  try {
    const { email, password } = req.body
    const data = await signIn(email, password)
    res.status(200).json({ user: data.user, session: data.session })
  } catch (err) {
    console.error(err)
    res.status(401).json({ error: err.message })
  }
}

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
}

export { Login, Register, Home }

