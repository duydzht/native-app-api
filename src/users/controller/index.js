const Bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const config = require('../../../config');
const User = require('../models/mongoose');

module.exports.signUp = async (req, res) => {
  const { password, email, username, fullname, address } = req.body;

  const newUser = new User({
    password: Bcrypt.hashSync(password, 10),
    email,
    username,
    fullname,
    address,
  });

  try {
    const savedUser = await newUser.save();

    // const token = jwt.sign(
    //   { email, id: savedUser.id, username },
    //   config.API_KEY_JWT,
    //   { expiresIn: config.TOKEN_EXPIRES_IN }
    // );
    if (savedUser) {
      res.json({ success: true, data: savedUser });
    } else {
      res.json({});
    }
  } catch (error) {
    return res.json({
      success: false,
      data: error,
    });
  }
};

module.exports.login = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user) {
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
    res.status(500).json({
      success: false,
      data: 'Internal server error',
    });
  }
};
