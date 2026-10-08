'use server';

import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Category from '@/models/Category';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function addProduct(formData: FormData) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'admin') {
      return { success: false, error: 'Unauthorized' };
    }

    await dbConnect();

    // Ensure at least one category exists
    let categoryId = formData.get('categoryId');
    
    if (!categoryId) {
      let defaultCat = await Category.findOne();
      if (!defaultCat) {
        defaultCat = await Category.create({
          name: { bn: 'সাধারণ কালেকশন', en: 'General Collection' },
          slug: 'general',
          image: '/images/hero_bangles.jpg'
        });
      }
      categoryId = defaultCat._id.toString();
    }

    const titleBn = formData.get('titleBn') as string;
    const slug = formData.get('slug') as string;
    const price = Number(formData.get('price'));
    const costPrice = Number(formData.get('costPrice'));
    const descriptionBn = formData.get('descriptionBn') as string;
    
    const files = formData.getAll('images') as File[];
    const imageUrls: string[] = [];

    for (const file of files) {
      if (file.size === 0) continue;
      
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      if (process.env.CLOUDINARY_CLOUD_NAME) {
        // upload to cloudinary via stream
        const url = await new Promise<string>((resolve, reject) => {
          cloudinary.uploader.upload_stream({ folder: 'shokher_box' }, (error, result) => {
            if (error) reject(error);
            else resolve(result!.secure_url);
          }).end(buffer);
        });
        imageUrls.push(url);
      } else {
        // fallback to local fs
        const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
        const uploadDir = path.join(process.cwd(), 'public/uploads');
        await mkdir(uploadDir, { recursive: true });
        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);
        imageUrls.push(`/uploads/${filename}`);
      }
    }

    if (imageUrls.length === 0) {
      imageUrls.push('/images/threepiece_hero.jpg');
    }

    await Product.create({
      title: { bn: titleBn, en: titleBn }, // fallback
      slug,
      category: categoryId,
      description: { bn: descriptionBn, en: descriptionBn },
      price,
      costPrice,
      images: imageUrls,
      isActive: true
    });

    revalidatePath('/admin/products');
    return { success: true };
  } catch (error: any) {
    console.error('Error adding product:', error);
    return { success: false, error: error.message };
  }
}
