const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const bcrypt = require('bcrypt');

module.exports = {
    create,
    login,
    checkToken
}

async function create(req, res) {
   try {
    const user = await User.create(req.body)

    const token = createJWT(user);

    res.json(token);
   } catch (err) {
    res.status(400).json(err)
   }
}

async function login(req, res) {
  try {
    const { email, password} = req.body;

    // Find the user by their email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password'});
    }

    // Compare the provided password with the hashed password in DB
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords match, create a JWT and sent to client
    if (passwordMatch) {
      const token = createJWT(user);
      res.json({ token });
    } else {
      res.status(400).json({ message: 'Invalid email or password'});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error'});
  }
}

function checkToken(req, res) {
  console.log('req.user', req.user)
  res.json(req.exp);
}

// Helper functions
function createJWT(user) {
  return jwt.sign(
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  )
}