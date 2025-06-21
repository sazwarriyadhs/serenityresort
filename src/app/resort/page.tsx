'use client';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Palmtree, Sprout, Dumbbell, Waves } from 'lucide-react';
import { useLocale } from '@/hooks/use-locale';

const amenities = [
  {
    name: { id: 'Kolam Renang Infinity', en: 'Infinity Pool' },
    description: { id: 'Bersantai dan rileks di kolam renang infinity kami yang menakjubkan dengan pemandangan laut yang indah. Buka setiap hari dari jam 7 pagi sampai 9 malam.', en: 'Relax and unwind in our stunning infinity pool with panoramic ocean views. Open daily from 7 AM to 9 PM.' },
    icon: Waves,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'resort pool',
  },
  {
    name: { id: 'Pusat Kebugaran', en: 'Fitness Center' },
    description: { id: 'Tetap aktif dengan gym canggih kami, yang dilengkapi dengan mesin kardio, angkat beban, dan matras yoga.', en: 'Stay active with our state-of-the-art gym, featuring cardio machines, free weights, and yoga mats.' },
    icon: Dumbbell,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'fitness center',
  },
  {
    name: { id: 'Spa Serenity', en: 'Serenity Spa' },
    description: { id: 'Manjakan diri dengan berbagai perawatan mulai dari pijat hingga facial di spa kami yang tenang. Disarankan untuk melakukan reservasi terlebih dahulu.', en: 'Indulge in a range of treatments from massages to facials at our tranquil spa. Advance booking recommended.' },
    icon: Sprout,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'spa interior',
  },
  {
    name: { id: 'Akses Pantai Pribadi', en: 'Private Beach Access' },
    description: { id: 'Nikmati akses eksklusif ke pantai pribadi kami yang masih asli, lengkap dengan kursi berjemur dan layanan handuk.', en: 'Enjoy exclusive access to our pristine private beach, complete with sun loungers and towel service.' },
    icon: Palmtree,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'private beach',
  },
];

export default function PublicResortPage() {
  const { t } = useLocale();
  return (
    <div className="container py-16">
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{t({ id: 'Fasilitas Resor', en: 'Resort Amenities' })}</h1>
            <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">{t({ id: 'Tingkatkan pengalaman menginap Anda dengan fasilitas dan layanan kelas dunia kami.', en: 'Enhance your stay with our world-class facilities and services.' })}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
            {amenities.map((amenity, index) => (
            <Card key={index} className="overflow-hidden group flex flex-col sm:flex-row">
                <div className="relative sm:w-1/3 h-48 sm:h-auto shrink-0">
                    <Image 
                        src={amenity.image} 
                        alt={t(amenity.name)} 
                        data-ai-hint={amenity.dataAiHint}
                        fill
                        className="object-cover" 
                    />
                </div>
                <div className="flex flex-col flex-grow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                            <amenity.icon className="h-8 w-8 text-primary" />
                            {t(amenity.name)}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CardDescription>{t(amenity.description)}</CardDescription>
                    </CardContent>
                </div>
            </Card>
            ))}
        </div>
    </div>
  );
}
