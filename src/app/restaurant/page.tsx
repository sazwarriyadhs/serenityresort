'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Clock, Phone } from 'lucide-react';
import { useLocale } from '@/hooks/use-locale';

const menuCategories = [
  {
    category: { id: 'Makanan Pembuka', en: 'Appetizers' },
    items: [
      { name: { id: 'Salad Caesar', en: 'Caesar Salad' }, price: 12.50, description: { id: 'Romaine renyah, parmesan, crouton, dan saus Caesar klasik.', en: 'Crisp romaine, parmesan, croutons, and classic Caesar dressing.' } },
      { name: { id: 'Sup Bawang Perancis', en: 'French Onion Soup' }, price: 14.00, description: { id: 'Kaldu sapi kaya rasa, bawang bombay karamel, dan kerak keju gruyère.', en: 'Rich beef broth, caramelized onions, and a gruyère cheese crust.' } },
    ],
  },
  {
    category: { id: 'Hidangan Utama', en: 'Main Courses' },
    items: [
      { name: { id: 'Salmon Panggang', en: 'Grilled Salmon' }, price: 28.00, description: { id: 'Disajikan dengan asparagus dan saus lemon-dill.', en: 'Served with asparagus and lemon-dill sauce.' } },
      { name: { id: 'Filet Mignon', en: 'Filet Mignon' }, price: 45.00, description: { id: 'Filet 8oz, dengan gratin kentang dan reduksi anggur merah.', en: '8oz center-cut filet, with potato gratin and red wine reduction.' } },
      { name: { id: 'Risotto Jamur', en: 'Mushroom Risotto' }, price: 24.00, description: { id: 'Nasi Arborio krim dengan jamur liar dan minyak truffle.', en: 'Creamy Arborio rice with wild mushrooms and truffle oil.' } },
    ],
  },
  {
    category: { id: 'Hidangan Penutup', en: 'Desserts' },
    items: [
      { name: { id: 'Cheesecake New York', en: 'New York Cheesecake' }, price: 9.00, description: { id: 'Cheesecake klasik dengan kerak biskuit graham dan coulis beri.', en: 'Classic cheesecake with a graham cracker crust and berry coulis.' } },
      { name: { id: 'Kue Cokelat Lava', en: 'Chocolate Lava Cake' }, price: 11.00, description: { id: 'Kue cokelat hangat dengan bagian tengah yang meleleh, disajikan dengan es krim vanila.', en: 'Warm chocolate cake with a molten center, served with vanilla ice cream.' } },
    ],
  },
];

export default function PublicRestaurantPage() {
  const { t, formatCurrency } = useLocale();

  return (
    <div className="bg-card">
      <div className="container py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
                 <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">The Serenity Grill</h1>
                 <p className="text-muted-foreground text-lg mt-4">{t({ id: 'Pengalaman bersantap mewah di mana cita rasa istimewa bertemu dengan pemandangan yang menakjubkan. Koki kami hanya menggunakan bahan-bahan lokal segar untuk menciptakan mahakarya kuliner yang akan memanjakan indra Anda.', en: 'A fine dining experience where exquisite flavors meet breathtaking views. Our chefs use only the freshest local ingredients to create culinary masterpieces that will delight your senses.' })}</p>
                 <div className="flex flex-col sm:flex-row gap-6 mt-8">
                    <div className="flex items-center gap-3">
                        <Clock className="h-6 w-6 text-primary" />
                        <div>
                            <p className="font-semibold">{t({ id: 'Jam Buka', en: 'Hours' })}</p>
                            <p className="text-muted-foreground">{t({ id: 'Makan Malam: 18:00 - 22:00', en: 'Dinner: 6 PM - 10 PM' })}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-3">
                        <Phone className="h-6 w-6 text-primary" />
                        <div>
                            <p className="font-semibold">{t({ id: 'Reservasi', en: 'Reservations' })}</p>
                            <p className="text-muted-foreground">(123) 456-7890</p>
                        </div>
                    </div>
                 </div>
                 <Button size="lg" className="mt-8">{t({ id: 'Buat Reservasi', en: 'Make a Reservation' })}</Button>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden">
                <Image src="https://placehold.co/600x400.png" data-ai-hint="fine dining restaurant" alt="Interior of The Serenity Grill" fill className="object-cover"/>
            </div>
        </div>

        <div className="mt-24">
            <h2 className="text-4xl font-headline text-center mb-12">{t({ id: 'Menu Kami', en: 'Our Menu' })}</h2>
            <div className="space-y-12">
                {menuCategories.map(category => (
                    <div key={t(category.category)}>
                        <h3 className="text-3xl font-headline text-primary mb-6 flex items-center gap-3"><ChefHat /> {t(category.category)}</h3>
                        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                            {category.items.map(item => (
                                <div key={t(item.name)} className="border-b border-dashed border-border pb-3">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-semibold text-lg">{t(item.name)}</h4>
                                        <p className="text-lg font-semibold text-primary whitespace-nowrap pl-4">{formatCurrency(item.price)}</p>
                                    </div>
                                    <p className="text-muted-foreground text-sm">{t(item.description)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
