import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  item: {
    type: Object
  },
  quantity: {
    type: Number,
    required: true,
  },
  tableNumber: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['in attesa', 'in preparazione', 'servito'],
    default: 'in attesa',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
