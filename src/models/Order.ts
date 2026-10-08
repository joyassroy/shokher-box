import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    orderNo: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        variant: {
          size: String,
          color: String,
          sku: String
        },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        costPrice: { type: Number, required: true }
      }
    ],
    shipping: {
      name: String,
      phone: String,
      division: String,
      district: String,
      upazila: String,
      address: String
    },
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    deliveryCharge: { type: Number, required: true },
    codAmount: { type: Number, required: true }, // subtotal - discount
    deliveryPayment: {
      method: { type: String, enum: ['bkash', 'nagad', 'rocket', 'cod'], required: true },
      senderNumber: { type: String, required: true },
      trxId: { type: String, required: true, unique: true },
      amount: { type: Number, required: true },
      status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
      verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      verifiedAt: Date
    },
    status: {
      type: String,
      enum: ['Payment যাচাই', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Returned', 'Cancelled'],
      default: 'Payment যাচাই'
    },
    statusHistory: [
      {
        status: String,
        timestamp: { type: Date, default: Date.now },
        note: String
      }
    ],
    locale: { type: String, enum: ['bn', 'en'], default: 'bn' },
    courier: {
      name: String,
      trackingId: String
    },
    utm: {
      source: String,
      medium: String,
      campaign: String
    }
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
