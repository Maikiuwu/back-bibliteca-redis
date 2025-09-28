


export async function Login (req, res) {
  try {
    
    //recibe la info del front asi bien pro

    
  } catch (err) {
    console.error(err)
    res.status(401).json({ error: err.message })
  }
}

export async function Save (req, res) {
 try {
    
    //recibe la info del front
    //guarda en redis

    
  } catch (err) {
    console.error(err)
    res.status(401).json({ error: err.message })
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



