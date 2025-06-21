'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Wifi, Tv, Wind } from 'lucide-react';
import { useLocale } from '@/hooks/use-locale';

const roomTypes = [
  {
    name: { id: 'Kamar Queen Deluxe', en: 'Deluxe Queen Room' },
    description: { id: 'Kamar luas dengan tempat tidur ukuran queen, cocok untuk pasangan atau pelancong solo yang mencari kenyamanan dan gaya.', en: 'A spacious room with a queen-sized bed, perfect for couples or solo travelers seeking comfort and style.' },
    price: 150,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'deluxe room',
    features: [
      { icon: Users, text: { id: '2 Tamu', en: '2 Guests' } },
      { icon: Wifi, text: { id: 'Wi-Fi Gratis', en: 'Free Wi-Fi' } },
      { icon: Tv, text: { id: 'TV 4K', en: '4K TV' } },
      { icon: Wind, text: { id: 'Ber-AC', en: 'Air-conditioned' } },
    ],
  },
  {
    name: { id: 'Suite King Eksekutif', en: 'Executive King Suite' },
    description: { id: 'Rasakan kemewahan di suite kami yang dilengkapi dengan ruang tamu terpisah, tempat tidur king, dan pemandangan laut yang indah.', en: 'Experience luxury in our suite featuring a separate living area, a king-sized bed, and panoramic ocean views.' },
    price: 400,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'luxury suite',
    features: [
      { icon: Users, text: { id: '3 Tamu', en: '3 Guests' } },
      { icon: Wifi, text: { id: 'Wi-Fi Gratis', en: 'Free Wi-Fi' } },
      { icon: Tv, text: { id: 'TV 4K 55"', en: '55" 4K TV' } },
      { icon: Wind, text: { id: 'Ber-AC', en: 'Air-conditioned' } },
    ],
  },
  {
    name: { id: 'Bungalow Taman Keluarga', en: 'Family Garden Bungalow' },
    description: { id: 'Ideal untuk keluarga, bungalow ini menawarkan dua kamar tidur dan teras taman pribadi untuk masa inap yang santai.', en: 'Ideal for families, this bungalow offers two bedrooms and a private garden terrace for a relaxing stay.' },
    price: 320,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'garden bungalow',
    features: [
      { icon: Users, text: { id: '4 Tamu', en: '4 Guests' } },
      { icon: Wifi, text: { id: 'Wi-Fi Gratis', en: 'Free Wi-Fi' } },
      { icon: Tv, text: { id: '2x TV 4K', en: '2x 4K TV' } },
      { icon: Wind, text: { id: 'Ber-AC', en: 'Air-conditioned' } },
    ],
  },
   {
    name: { id: 'Kamar Double Standar', en: 'Standard Double Room' },
    description: { id: 'Kamar yang nyaman dengan dua tempat tidur double, dilengkapi dengan semua fasilitas penting untuk masa inap yang menyenangkan.', en: 'A cozy and comfortable room with two double beds, equipped with all the essential amenities for a pleasant stay.' },
    price: 220,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'hotel room',
    features: [
      { icon: Users, text: { id: '4 Tamu', en: '4 Guests' } },
      { icon: Wifi, text: { id: 'Wi-Fi Gratis', en: 'Free Wi-Fi' } },
      { icon: Tv, text: { id: 'TV 4K', en: '4K TV' } },
      { icon: Wind, text: { id: 'Ber-AC', en: 'Air-conditioned' } },
    ],
  },
];

export default function PublicRoomsPage() {
    const { t, formatCurrency } = useLocale();

    return (
        <div className="container py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{t({ id: 'Kamar & Suite Kami', en: 'Our Rooms & Suites' })}</h1>
                <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">{t({ id: 'Didesain untuk kenyamanan, ditata dengan keanggunan. Temukan ruang yang sempurna untuk liburan Anda.', en: 'Designed for comfort, styled with elegance. Find the perfect space for your getaway.' })}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {roomTypes.map((room, index) => (
                    <Card key={index} className="overflow-hidden flex flex-col group">
                       <div className="relative h-64 w-full overflow-hidden">
                          <Image 
                            src={room.imageUrl} 
                            alt={t(room.name)} 
                            data-ai-hint={room.dataAiHint}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105" 
                          />
                        </div>
                        <CardHeader className="flex-grow">
                            <div className="flex justify-between items-start">
                                <CardTitle className="font-headline text-2xl">{t(room.name)}</CardTitle>
                                <Badge variant="secondary" className="text-lg whitespace-nowrap">{formatCurrency(room.price)}/{t({id: "malam", en: "night"})}</Badge>
                            </div>
                           <CardDescription className="pt-2">{t(room.description)}</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className="grid grid-cols-2 gap-4 text-muted-foreground mb-6">
                               {room.features.map(feature => (
                                   <div key={t(feature.text)} className="flex items-center gap-2">
                                       <feature.icon className="h-5 w-5 text-primary" />
                                       <span>{t(feature.text)}</span>
                                   </div>
                               ))}
                           </div>
                           <Button className="w-full">{t({id: "Pesan Sekarang", en: "Book Now"})}</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
