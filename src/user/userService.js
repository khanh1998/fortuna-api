import User from './user.js';

export async function createUser(req, res) {
  try {
    const { username, password, avatar, email } = req.body;
    const user = {
      username,
      password,
      avatar,
      email,
    };
    const isExistedUsername = await User.findOne({ username });
    if (!isExistedUsername) {
      const newUser = new User(user);
      const created = await newUser.save();
      if (created) {
        res.status(200).json(created);
      } else {
        res.status(400).json({
          success: false,
          message: 'Cannot create user, check your parameter',
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: `Username ${username} is taken already, please choose another username`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getUser(req, res) {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({
        success: false,
        message: `User ${username} is not existed!`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
