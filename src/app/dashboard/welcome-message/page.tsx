'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateWelcomeMessage, GenerateWelcomeMessageInput } from '@/ai/flows/generate-welcome-message';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Sparkles } from 'lucide-react';

const formSchema = z.object({
  guestName: z.string().min(2, { message: 'Guest name is required.' }),
  guestPreferences: z.string().min(5, { message: 'Guest preferences are required.' }),
  previousStayDetails: z.string().optional(),
});

export default function WelcomeMessagePage() {
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guestName: '',
      guestPreferences: '',
      previousStayDetails: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setWelcomeMessage('');
    try {
      const input: GenerateWelcomeMessageInput = {
        ...values,
        previousStayDetails: values.previousStayDetails || 'No previous stays.',
      };
      const result = await generateWelcomeMessage(input);
      setWelcomeMessage(result.welcomeMessage);
    } catch (error) {
      console.error('Failed to generate welcome message:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not generate welcome message. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline text-foreground">AI Welcome Message Generator</h1>
        <p className="text-muted-foreground">Craft personalized welcome messages for your guests using AI.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Guest Information</CardTitle>
            <CardDescription>Provide details about the guest to generate a message.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="guestName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guest Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Jane Austen" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="guestPreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guest Preferences</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Prefers a quiet room, high floor, loves chocolate." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="previousStayDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Previous Stay Details (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Stayed in room 301 last June, requested extra pillows." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin mr-2 h-4 w-4"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline">Generated Message</CardTitle>
            <CardDescription>The AI-crafted welcome message will appear here.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <Textarea
              readOnly
              value={welcomeMessage}
              className="h-full min-h-[300px] text-base"
              placeholder="Your personalized message is being crafted..."
            />
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full" onClick={() => navigator.clipboard.writeText(welcomeMessage)} disabled={!welcomeMessage}>
              Copy to Clipboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
