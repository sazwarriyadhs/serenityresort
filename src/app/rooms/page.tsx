'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Wifi, Tv, Wind } from 'lucide-react';

const roomTypes = [
  {
    name: 'Deluxe Queen Room',
    description: 'A spacious room with a queen-sized bed, perfect for couples or solo travelers seeking comfort and style.',
    price: 150,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'hotel room modern',
    features: [
      { icon: Users, text: '2 Guests' },
      { icon: Wifi, text: 'Free Wi-Fi' },
      { icon: Tv, text: '4K TV' },
      { icon: Wind, text: 'Air-conditioned' },
    ],
  },
  {
    name: 'Executive King Suite',
    description: 'Experience luxury in our suite featuring a separate living area, a king-sized bed, and panoramic ocean views.',
    price: 400,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'luxury hotel suite',
    features: [
      { icon: Users, text: '3 Guests' },
      { icon: Wifi, text: 'Free Wi-Fi' },
      { icon: Tv, text: '55" 4K TV' },
      { icon: Wind, text: 'Air-conditioned' },
    ],
  },
  {
    name: 'Family Garden Bungalow',
    description: 'Ideal for families, this bungalow offers two bedrooms and a private garden terrace for a relaxing stay.',
    price: 320,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'hotel bungalow garden',
    features: [
      { icon: Users, text: '4 Guests' },
      { icon: Wifi, text: 'Free Wi-Fi' },
      { icon: Tv, text: '2x 4K TV' },
      { icon: Wind, text: 'Air-conditioned' },
    ],
  },
   {
    name: 'Standard Double Room',
    description: 'A cozy and comfortable room with two double beds, equipped with all the essential amenities for a pleasant stay.',
    price: 220,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'hotel room cozy',
    features: [
      { icon: Users, text: '4 Guests' },
      { icon: Wifi, text: 'Free Wi-Fi' },
      { icon: Tv, text: '4K TV' },
      { icon: Wind, text: 'Air-conditioned' },
    ],
  },
];

export default function PublicRoomsPage() {
    return (
        <div className="container py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Our Rooms & Suites</h1>
                <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">Designed for comfort, styled with elegance. Find the perfect space for your getaway.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {roomTypes.map((room) => (
                    <Card key={room.name} className="overflow-hidden flex flex-col group">
                       <div className="relative h-64 w-full overflow-hidden">
                          <Image 
                            src={room.imageUrl} 
                            alt={room.name} 
                            data-ai-hint={room.dataAiHint}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105" 
                          />
                        </div>
                        <CardHeader className="flex-grow">
                            <div className="flex justify-between items-start">
                                <CardTitle className="font-headline text-2xl">{room.name}</CardTitle>
                                <Badge variant="secondary" className="text-lg whitespace-nowrap">${room.price}/night</Badge>
                            </div>
                           <CardDescription className="pt-2">{room.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className="grid grid-cols-2 gap-4 text-muted-foreground mb-6">
                               {room.features.map(feature => (
                                   <div key={feature.text} className="flex items-center gap-2">
                                       <feature.icon className="h-5 w-5 text-primary" />
                                       <span>{feature.text}</span>
                                   </div>
                               ))}
                           </div>
                           <Button className="w-full">Book Now</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
