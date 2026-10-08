const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://shoker-box:jfxCFAH69St2q3vy@cluster0.umszehx.mongodb.net/shokher_baxho?retryWrites=true&w=majority&appName=Cluster0";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      bn: { type: String, required: true },
      en: { type: String }
    },
    slug: { type: String, required: true, unique: true },
    description: {
      bn: { type: String },
      en: { type: String }
    },
    image: { type: String },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

async function seed() {
  await mongoose.connect(MONGODB_URI);
  
  const cats = [
    { name: { bn: 'চুড়ি', en: 'Bangles' }, slug: 'churi', image: '/images/hero_bangles.jpg' },
    { name: { bn: 'থ্রি পিস', en: 'Three Piece' }, slug: 'threepiece', image: '/images/threepiece_hero.jpg' },
    { name: { bn: 'বিয়ের ঝাঁপি', en: 'Bridal Jhapi' }, slug: 'jhapi', image: '/images/cat_jhapi.jpg' }
  ];

  for (const cat of cats) {
    await Category.updateOne({ slug: cat.slug }, { $set: cat }, { upsert: true });
  }

  console.log('Categories seeded successfully!');
  process.exit(0);
}

seed();
