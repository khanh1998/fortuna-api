import mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asset',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    amount: {
      type: Number,
      required: true,
    },
    ref: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
    },
    type: {
      type: String,
      enum: ['DEBIT', 'CREDIT', 'TRANSFER'],
      required: true,
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

TransactionSchema.set('toObject', { virtuals: true });
TransactionSchema.set('toJSON', { virtuals: true });
export const TransactionModel = mongoose.model('Transaction', TransactionSchema);
