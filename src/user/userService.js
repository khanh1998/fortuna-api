import User from './user.js';

export async function authenticate(req, res) {
  console.log(req, res);
}
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
    const { username } = req.user;
    const data = await User.findOne({ username });
    if (data) {
      res.status(200).json(data.toJSON({ virtuals: true }));
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

export async function updateUser(req, res) {
  try {
    const { username } = req.user;
    const {
      name,
      password,
      email,
      phone,
      avatar,
      currency,
      language,
      assets,
      lastestTransactions,
    } = req.body;
    let input = {
      name,
      password,
      email,
      phone,
      avatar,
      currency,
      language,
      assets,
      lastestTransactions,
    };
    input = Object.fromEntries(
      Object.entries(input).filter(([k, v]) => v != null)
    );
    const updated = await User.findOneAndUpdate({ username }, input, {
      new: true,
      useFindAndModify: false,
    });
    const user = await User.findOne({ username });
    return res.status(200).json(user.toJSON({ virtuals: true }));
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
}
