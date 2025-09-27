
async function Login (req, res) {
  try {
    
    
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'papi chocolisto' })
  }
}

async function Register (req, res) {
  try {
    // llamada al servicio de registro de usuario de supabase
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'papi error' })
  }
}

async function Home (req, res) {
  try {
  } catch (err) { console.error(err)
    res.status(500).json({ error: 'papi error' })
  }
}

export { Login, Register, Home }

