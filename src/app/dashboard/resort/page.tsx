'use client';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Palmtree, Sprout, Dumbbell, Waves } from 'lucide-react';

const amenities = [
  {
    name: 'Swimming Pool',
    description: 'Olympic-sized pool with a kids area.',
    status: 'Open',
    icon: Waves,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'resort pool',
  },
  {
    name: 'Fitness Center',
    description: 'State-of-the-art gym equipment.',
    status: 'Open',
    icon: Dumbbell,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'fitness center',
  },
  {
    name: 'Serenity Spa',
    description: 'Full-service spa with massages and treatments.',
    status: 'Open',
    icon: Sprout,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'resort spa',
  },
  {
    name: 'Beachfront Access',
    description: 'Private beach access for all guests.',
    status: 'Maintenance',
    icon: Palmtree,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'beachfront resort',
  },
];

export default function ResortManagementPage() {
  const getStatusVariant = (status: string) => {
    return status === 'Open' ? 'default' : 'secondary';
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline text-foreground">Resort Amenities Management</h1>
        <p className="text-muted-foreground">Manage and monitor resort facilities and activities.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {amenities.map((amenity) => (
          <Card key={amenity.name} className="overflow-hidden flex flex-col">
             <div className="relative h-48 w-full">
              <Image 
                src={amenity.image} 
                alt={amenity.name} 
                data-ai-hint={amenity.dataAiHint}
                fill
                className="object-cover" 
              />
            </div>
            <CardHeader className="flex-grow">
               <div className="flex justify-between items-start">
                  <CardTitle className="flex items-center gap-2 font-headline">
                    <amenity.icon className="h-6 w-6" />
                    {amenity.name}
                  </CardTitle>
                   <Badge variant={getStatusVariant(amenity.status)}>{amenity.status}</Badge>
               </div>
              <CardDescription>{amenity.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Manage Amenity</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
