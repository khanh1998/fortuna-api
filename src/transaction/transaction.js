import mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    assetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asset',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    prevTransactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
    },
    amount: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      // eslint-disable-next-line object-shorthand
      transform: function (doc, ret, options) {
        delete ret.user;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

TransactionSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

TransactionSchema.virtual('asset', {
  ref: 'Asset',
  localField: 'assetId',
  foreignField: '_id',
  justOne: true,
});

TransactionSchema.virtual('prev', {
  ref: 'Transaction',
  localField: 'prevTransactionId',
  foreignField: '_id',
  justOne: true,
});

// TransactionSchema.set('toObject', { virtuals: true });
// TransactionSchema.set('toJSON', { virtuals: true });
export const TransactionModel = mongoose.model('Transaction', TransactionSchema);
