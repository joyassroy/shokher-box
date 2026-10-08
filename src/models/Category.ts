import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    name: {
      bn: { type: String, required: true },
      en: { type: String }
    },
    slug: { type: String, required: true, unique: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    accentColor: { type: String, default: 'var(--sindoor)' },
    image: { type: String },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
