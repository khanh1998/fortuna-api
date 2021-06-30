/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userAssetSchema = new mongoose.Schema(
  {
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asset',
    },
    amount: {
      type: Number,
      min: [0, 'Minimum amount of a asset is zero'],
    },
    hide: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      // eslint-disable-next-line object-shorthand
      transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (username) => {
          const re = /^[a-zA-Z0-9]+$/;
          return re.test(username);
        },
        message: (props) => `${props.value} is not valid username`,
      },
    },
    name: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minLength: [4, 'minimum length of password is 4'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => {
          const re =
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
          return re.test(String(email).toLowerCase());
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    phone: {
      type: String,
    },
    avatar: {
      type: String,
    },
    currency: {
      type: String,
      enum: ['usd', 'vnd', 'eur'],
    },
    language: {
      type: String,
      enum: ['en', 'vi'],
    },
    assets: [userAssetSchema],
    lastestTransactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      // eslint-disable-next-line object-shorthand
      transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
  },
);
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, (saltError, salt) => {
    if (saltError) return next(saltError);
    bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) return next(hashError);
      user.password = hash;
      next();
    });
  });
});
userSchema.methods.comparePassword = async function compare(password) {
  try {
    const user = this;
    const matches = await bcrypt.compare(password, user.password);
    if (matches) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
  return false;
};

userSchema.methods.comparePassword = async function compare(password) {
  try {
    const user = this;
    const matches = await bcrypt.compare(password, user.password);
    if (matches) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
  return false;
};

export default mongoose.model('User', userSchema);
