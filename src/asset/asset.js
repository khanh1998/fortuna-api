import mongoose from 'mongoose';

export const AssetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    unit: {
      type: String,
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
  }
);
export const AssetModel = mongoose.model('Asset', AssetSchema);
