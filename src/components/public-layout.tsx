'use client';
import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useLocale } from '@/hooks/use-locale';
import { type Language, type Currency } from '@/context/locale-context';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Languages, DollarSign } from 'lucide-react';

const navItems = [
  { href: '/', label: { id: 'Beranda', en: 'Home' } },
  { href: '/rooms', label: { id: 'Kamar', en: 'Rooms' } },
  { href: '/restaurant', label: { id: 'Restoran', en: 'Restaurant' } },
  { href: '/resort', label: { id: 'Fasilitas', en: 'Amenities' } },
];

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { language, setLanguage, currency, setCurrency, t } = useLocale();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <svg viewBox="0 0 100 65" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto text-primary" fill="currentColor">
              <g><path d="M50 5C60 25 65 30 50 45C35 30 40 25 50 5Z" /><path d="M50 45C75 35 85 30 85 10C85 30 75 40 50 45Z" /><path d="M50 45C25 35 15 30 15 10C15 30 25 40 50 45Z" /></g>
              <path d="M25 50 C 40 45, 60 45, 75 50" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M20 58 C 40 53, 60 53, 80 58" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
            </svg>
            <span className="font-bold font-headline text-2xl">Serenity</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === item.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {t(item.label)}
              </Link>
            ))}
          </nav>
          <div className="flex flex-1 items-center justify-end gap-2">
             <div className="flex items-center gap-1">
                <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                    <SelectTrigger className="w-auto gap-2 border-none shadow-none bg-transparent focus:ring-0 focus:ring-offset-0">
                        <Languages className="h-5 w-5" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
                    <SelectTrigger className="w-auto gap-2 border-none shadow-none bg-transparent focus:ring-0 focus:ring-offset-0">
                        <DollarSign className="h-5 w-5" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="idr">IDR</SelectItem>
                    <SelectItem value="usd">USD</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button asChild><Link href="#">{t({ id: 'Pesan Sekarang', en: 'Book Now' })}</Link></Button>
            <Button variant="outline" asChild>
                <Link href="/login">{t({ id: 'Login Admin', en: 'Admin Login' })}</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="py-6 md:px-8 md:py-0 border-t">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                © {new Date().getFullYear()} Serenity. {t({ id: 'Hak cipta dilindungi undang-undang.', en: 'All rights reserved.' })}
            </p>
        </div>
      </footer>
    </div>
  );
}
