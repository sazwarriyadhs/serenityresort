// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview AI tool to generate custom welcome messages for guests, based on guest preferences and previous stays.
 *
 * - generateWelcomeMessage - A function that handles the welcome message generation process.
 * - GenerateWelcomeMessageInput - The input type for the generateWelcomeMessage function.
 * - GenerateWelcomeMessageOutput - The return type for the generateWelcomeMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWelcomeMessageInputSchema = z.object({
  guestName: z.string().describe('The name of the guest.'),
  guestPreferences: z.string().describe('The preferences of the guest, such as preferred room type, amenities, or activities.'),
  previousStayDetails: z.string().describe('Details about the guest\'s previous stays, including dates, room numbers, and any special requests.'),
});
export type GenerateWelcomeMessageInput = z.infer<typeof GenerateWelcomeMessageInputSchema>;

const GenerateWelcomeMessageOutputSchema = z.object({
  welcomeMessage: z.string().describe('The personalized welcome message for the guest.'),
});
export type GenerateWelcomeMessageOutput = z.infer<typeof GenerateWelcomeMessageOutputSchema>;

export async function generateWelcomeMessage(input: GenerateWelcomeMessageInput): Promise<GenerateWelcomeMessageOutput> {
  return generateWelcomeMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWelcomeMessagePrompt',
  input: {schema: GenerateWelcomeMessageInputSchema},
  output: {schema: GenerateWelcomeMessageOutputSchema},
  prompt: `You are a hotel concierge expert at crafting personalized welcome messages.

  Based on the guest's preferences and previous stay details, create a warm and inviting welcome message.

  Guest Name: {{{guestName}}}
  Guest Preferences: {{{guestPreferences}}}
  Previous Stay Details: {{{previousStayDetails}}}

  Welcome Message:`,
});

const generateWelcomeMessageFlow = ai.defineFlow(
  {
    name: 'generateWelcomeMessageFlow',
    inputSchema: GenerateWelcomeMessageInputSchema,
    outputSchema: GenerateWelcomeMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
