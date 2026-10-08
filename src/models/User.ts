import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: true, sparse: true },
    password: { type: String }, // For credentials provider
    image: { type: String },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    provider: { type: String, enum: ['google', 'credentials'], required: true },
    locale: { type: String, enum: ['bn', 'en'], default: 'bn' },
    profileComplete: { type: Boolean, default: false },
    birthday: { type: Date },
    district: { type: String },
    source: { type: String }, // FB/Friend/Google
    addresses: [
      {
        name: String,
        phone: String,
        division: String,
        district: String,
        upazila: String,
        address: String,
        isDefault: Boolean
      }
    ],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
