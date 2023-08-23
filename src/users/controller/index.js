const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../../../config');
const User = require('../models/mongoose');

module.exports.signUp = async (req, res) => {
  const { password, passwordConfirmation, email, username, fullName, address } =
    req.body;

  if (password === passwordConfirmation) {
    const newUser = new User({
      password: Bcrypt.hashSync(password, 10),
      email,
      username,
      fullName,
      address,
    });

    try {
      const savedUser = await newUser.save();

      const token = jwt.sign(
        { email, id: savedUser.id, username },
        config.API_KEY_JWT,
        { expiresIn: config.TOKEN_EXPIRES_IN }
      );

      return res.status(201).json({ token });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  }

  return res.status(400).json({
    status: 400,
    message: 'Passwords are different, try again!!!',
  });
};

module.exports.login = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user) {
      console.log(user);
      res.json({
        success: true,
        data: user,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
