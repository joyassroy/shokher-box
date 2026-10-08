import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: {
      bn: { type: String, required: true },
      en: { type: String }
    },
    slug: { type: String, required: true, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    description: {
      bn: { type: String, required: true },
      en: { type: String }
    },
    images: [{ type: String }],
    price: { type: Number, required: true },
    comparePrice: { type: Number },
    costPrice: { type: Number, required: true },
    variants: [
      {
        size: String, // 2.2, 2.4 etc
        color: String,
        sku: String,
        stock: { type: Number, default: 0 }
      }
    ],
    tags: [{ type: String }],
    material: { type: String },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    ratingAvg: { type: Number, default: 0 },
    soldCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
