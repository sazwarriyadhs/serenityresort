'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BedDouble, Utensils, Sprout, Star } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-center justify-center text-center text-white">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Luxury resort view with a pool at sunset"
          data-ai-hint="luxury resort sunset"
          fill
          priority
          className="object-cover -z-10"
        />
        <div className="absolute inset-0 bg-black/50 -z-10" />
        <div className="container z-10">
          <h1 className="text-5xl md:text-7xl font-headline font-bold">Experience Tranquility</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">Find your sanctuary at Serenity, where luxury meets peace.</p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/rooms">Explore Our Rooms</Link>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-card">
        <div className="container text-center">
            <h2 className="text-4xl font-headline text-primary">A Haven of Peace and Luxury</h2>
            <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
                Nestled in a secluded paradise, Serenity offers an unparalleled experience of comfort and elegance. Our commitment is to provide a memorable stay, blending world-class hospitality with the natural beauty of our surroundings.
            </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container">
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <BedDouble className="h-12 w-12 mx-auto text-primary"/>
                        <CardTitle className="font-headline mt-4">Exquisite Rooms</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Elegantly designed rooms and suites with breathtaking views, ensuring a restful and rejuvenating stay.</p>
                        <Button variant="link" asChild className="mt-4"><Link href="/rooms">View Rooms →</Link></Button>
                    </CardContent>
                </Card>
                 <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <Utensils className="h-12 w-12 mx-auto text-primary"/>
                        <CardTitle className="font-headline mt-4">Gourmet Dining</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <p className="text-muted-foreground">Savor culinary masterpieces at our signature restaurant, featuring fresh, locally-sourced ingredients.</p>
                        <Button variant="link" asChild className="mt-4"><Link href="/restaurant">Explore Menu →</Link></Button>
                    </CardContent>
                </Card>
                 <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <Sprout className="h-12 w-12 mx-auto text-primary"/>
                        <CardTitle className="font-headline mt-4">World-Class Amenities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Indulge in our spa, stay active at the fitness center, or relax by our pristine, private beach.</p>
                        <Button variant="link" asChild className="mt-4"><Link href="/resort">Discover More →</Link></Button>
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>

       {/* Testimonials Section */}
      <section className="py-24 bg-card">
        <div className="container">
          <h2 className="text-4xl font-headline text-center text-primary mb-12">What Our Guests Say</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-2">
                    {[...Array(5)].map((_,i) => <Star key={i} className="text-primary fill-primary"/>)}
                </div>
                <blockquote className="italic text-foreground">"An unforgettable escape! The attention to detail and the staff's warmth made our stay perfect. We're already planning our return."</blockquote>
                <p className="font-semibold mt-4">— The Johnson Family</p>
              </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                <div className="flex mb-2">
                    {[...Array(5)].map((_,i) => <Star key={i} className="text-primary fill-primary"/>)}
                </div>
                <blockquote className="italic text-foreground">"The restaurant is a culinary gem. Every meal was a delight. Truly a five-star dining experience with a view to match."</blockquote>
                <p className="font-semibold mt-4">— Michael Chen</p>
              </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                <div className="flex mb-2">
                    {[...Array(5)].map((_,i) => <Star key={i} className="text-primary fill-primary"/>)}
                </div>
                <blockquote className="italic text-foreground">"I've never felt so relaxed. The spa is world-class, and the beachfront is pristine. Serenity is the perfect name for this place."</blockquote>
                <p className="font-semibold mt-4">— Dr. Emily Carter</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
