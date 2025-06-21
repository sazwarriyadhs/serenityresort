'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

export default function LoginPage() {
  const { login } = useAuth();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    // In a real app, you'd send this to your server.
    // For this demo, any credential is valid.
    login(values);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl border-primary/20">
        <CardHeader className="text-center">
            <div className="flex flex-col items-center text-center mb-4">
                <svg
                    viewBox="0 0 100 65"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-auto text-primary mb-4"
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
                <CardTitle className="text-5xl font-headline tracking-wider">SERENITY</CardTitle>
                <CardDescription className="text-xs tracking-widest font-medium text-muted-foreground mt-2">HOTEL, RESORT AND RESTAURANT MANAGEMENT SYSTEM</CardDescription>
            </div>
          <CardDescription>Enter your credentials to access the management dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="manager@serenity.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
            <p className="text-center text-xs text-muted-foreground w-full">
                © {new Date().getFullYear()} Serenity. All rights reserved.
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
