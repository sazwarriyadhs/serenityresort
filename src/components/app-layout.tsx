'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BedDouble,
  Boxes,
  FileText,
  Globe,
  LayoutDashboard,
  LogOut,
  MoreVertical,
  PanelLeft,
  Settings,
  Sparkles,
  Palmtree,
  Users,
  UsersRound,
  Utensils,
} from 'lucide-react';

import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/rooms', label: 'Room Management', icon: BedDouble },
  { href: '/dashboard/resort', label: 'Resort Amenities', icon: Palmtree },
  { href: '/dashboard/restaurant', label: 'Restaurant', icon: Utensils },
  { href: '/dashboard/inventory', label: 'Inventory', icon: Boxes },
  { href: '/dashboard/customers', label: 'Customers', icon: UsersRound },
  { href: '/dashboard/users', label: 'User Management', icon: Users },
  { href: '/dashboard/welcome-message', label: 'Welcome AI', icon: Sparkles },
  { href: '/dashboard/reports', label: 'Reports', icon: FileText },
  { href: '/dashboard/integrations', label: 'Integrations', icon: Globe },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin text-primary"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          {isClient && <p className="text-muted-foreground">Loading...</p>}
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
            <div className="flex items-center justify-center gap-2 p-2">
                <svg
                    viewBox="0 0 100 65"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-auto text-primary"
                    fill="currentColor"
                >
                    <g>
                        <path d="M50 5C60 25 65 30 50 45C35 30 40 25 50 5Z" />
                        <path d="M50 45C75 35 85 30 85 10C85 30 75 40 50 45Z" />
                        <path d="M50 45C25 35 15 30 15 10C15 30 25 40 50 45Z" />
                    </g>
                    <path d="M25 50 C 40 45, 60 45, 75 50" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
                    <path d="M20 58 C 40 53, 60 53, 80 58" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
                </svg>
                <span className="font-headline text-2xl font-bold text-primary group-data-[collapsible=icon]:hidden">Serenity</span>
            </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label }}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex gap-2 items-center">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={`https://i.pravatar.cc/150?u=${user.email}`} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="text-left">
                                <p className="text-sm font-medium">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.role}</p>
                            </div>
                        </div>
                        <MoreVertical className="h-4 w-4" />
                    </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background/50 backdrop-blur-sm px-6 sticky top-0 z-30">
            <SidebarTrigger className="md:hidden"/>
            <div className="flex-1">
                {/* Optional Header Content */}
            </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
