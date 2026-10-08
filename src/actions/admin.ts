'use server';

import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Category from '@/models/Category';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

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
    
    const imageUrl = formData.get('image') as string || '/images/hero_bangles.jpg';

    await Product.create({
      title: { bn: titleBn, en: titleBn }, // fallback
      slug,
      category: categoryId,
      description: { bn: descriptionBn, en: descriptionBn },
      price,
      costPrice,
      images: [imageUrl],
      isActive: true
    });

    revalidatePath('/admin/products');
    return { success: true };
  } catch (error: any) {
    console.error('Error adding product:', error);
    return { success: false, error: error.message };
  }
}
