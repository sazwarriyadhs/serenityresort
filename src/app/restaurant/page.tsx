'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Clock, Phone } from 'lucide-react';

const menuCategories = [
  {
    category: 'Appetizers',
    items: [
      { name: 'Caesar Salad', price: 12.50, description: 'Crisp romaine, parmesan, croutons, and classic Caesar dressing.' },
      { name: 'French Onion Soup', price: 14.00, description: 'Rich beef broth, caramelized onions, and a gruyère cheese crust.' },
    ],
  },
  {
    category: 'Main Courses',
    items: [
      { name: 'Grilled Salmon', price: 28.00, description: 'Served with asparagus and lemon-dill sauce.' },
      { name: 'Filet Mignon', price: 45.00, description: '8oz center-cut filet, with potato gratin and red wine reduction.' },
      { name: 'Mushroom Risotto', price: 24.00, description: 'Creamy Arborio rice with wild mushrooms and truffle oil.' },
    ],
  },
  {
    category: 'Desserts',
    items: [
      { name: 'New York Cheesecake', price: 9.00, description: 'Classic cheesecake with a graham cracker crust and berry coulis.' },
      { name: 'Chocolate Lava Cake', price: 11.00, description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.' },
    ],
  },
];

export default function PublicRestaurantPage() {
  return (
    <div className="bg-card">
      <div className="container py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
                 <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">The Serenity Grill</h1>
                 <p className="text-muted-foreground text-lg mt-4">A fine dining experience where exquisite flavors meet breathtaking views. Our chefs use only the freshest local ingredients to create culinary masterpieces that will delight your senses.</p>
                 <div className="flex flex-col sm:flex-row gap-6 mt-8">
                    <div className="flex items-center gap-3">
                        <Clock className="h-6 w-6 text-primary" />
                        <div>
                            <p className="font-semibold">Hours</p>
                            <p className="text-muted-foreground">Dinner: 6 PM - 10 PM</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-3">
                        <Phone className="h-6 w-6 text-primary" />
                        <div>
                            <p className="font-semibold">Reservations</p>
                            <p className="text-muted-foreground">(123) 456-7890</p>
                        </div>
                    </div>
                 </div>
                 <Button size="lg" className="mt-8">Make a Reservation</Button>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden">
                <Image src="https://placehold.co/600x400.png" data-ai-hint="fine dining restaurant" alt="Interior of The Serenity Grill" fill className="object-cover"/>
            </div>
        </div>

        <div className="mt-24">
            <h2 className="text-4xl font-headline text-center mb-12">Our Menu</h2>
            <div className="space-y-12">
                {menuCategories.map(category => (
                    <div key={category.category}>
                        <h3 className="text-3xl font-headline text-primary mb-6 flex items-center gap-3"><ChefHat /> {category.category}</h3>
                        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                            {category.items.map(item => (
                                <div key={item.name} className="border-b border-dashed border-border pb-3">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-semibold text-lg">{item.name}</h4>
                                        <p className="text-lg font-semibold text-primary whitespace-nowrap pl-4">${item.price.toFixed(2)}</p>
                                    </div>
                                    <p className="text-muted-foreground text-sm">{item.description}</p>
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
