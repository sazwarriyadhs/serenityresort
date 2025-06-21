'use client';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Palmtree, Sprout, Dumbbell, Waves, Sun } from 'lucide-react';

const amenities = [
  {
    name: 'Infinity Pool',
    description: 'Relax and unwind in our stunning infinity pool with panoramic ocean views. Open daily from 7 AM to 9 PM.',
    icon: Waves,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'resort infinity pool',
  },
  {
    name: 'Fitness Center',
    description: 'Stay active with our state-of-the-art gym, featuring cardio machines, free weights, and yoga mats.',
    icon: Dumbbell,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'fitness center hotel',
  },
  {
    name: 'Serenity Spa',
    description: 'Indulge in a range of treatments from massages to facials at our tranquil spa. Advance booking recommended.',
    icon: Sprout,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'luxury spa interior',
  },
  {
    name: 'Private Beach Access',
    description: 'Enjoy exclusive access to our pristine private beach, complete with sun loungers and towel service.',
    icon: Palmtree,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'private beach resort',
  },
];

export default function PublicResortPage() {
  return (
    <div className="container py-16">
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Resort Amenities</h1>
            <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">Enhance your stay with our world-class facilities and services.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
            {amenities.map((amenity) => (
            <Card key={amenity.name} className="overflow-hidden group flex flex-col sm:flex-row">
                <div className="relative sm:w-1/3 h-48 sm:h-auto shrink-0">
                    <Image 
                        src={amenity.image} 
                        alt={amenity.name} 
                        data-ai-hint={amenity.dataAiHint}
                        fill
                        className="object-cover" 
                    />
                </div>
                <div className="flex flex-col flex-grow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                            <amenity.icon className="h-8 w-8 text-primary" />
                            {amenity.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CardDescription>{amenity.description}</CardDescription>
                    </CardContent>
                </div>
            </Card>
            ))}
        </div>
    </div>
  );
}
