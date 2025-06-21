'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

type Integration = {
  id: string;
  name: string;
  description: string;
  logo: React.ComponentType<{ className?: string }>;
};

const integrations: Integration[] = [
  { id: 'bookingcom', name: 'Booking.com', description: 'Global online travel agency.', logo: Globe },
  { id: 'agoda', name: 'Agoda', description: 'Popular in Asia.', logo: Globe },
  { id: 'traveloka', name: 'Traveloka', description: 'Southeast Asian travel platform.', logo: Globe },
  { id: 'ticketcom', name: 'Tiket.com', description: 'Indonesian online travel agent.', logo: Globe },
  { id: 'tripcom', name: 'Trip.com', description: 'Chinese multinational travel group.', logo: Globe },
  { id: 'tripadvisor', name: 'TripAdvisor', description: 'Travel guidance platform.', logo: Globe },
];

export default function IntegrationsPage() {
  const [connectedChannels, setConnectedChannels] = useState<Record<string, boolean>>({
    bookingcom: true,
    agoda: false,
    traveloka: true,
  });

  const handleToggle = (id: string) => {
    setConnectedChannels(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline text-foreground">Online Booking Integrations</h1>
        <p className="text-muted-foreground">Manage your connections to third-party booking channels.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => {
          const isConnected = !!connectedChannels[integration.id];
          return (
            <Card key={integration.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <integration.logo className="h-8 w-8 text-primary" />
                        <CardTitle className="font-headline text-2xl">{integration.name}</CardTitle>
                    </div>
                    <Switch
                        id={`switch-${integration.id}`}
                        checked={isConnected}
                        onCheckedChange={() => handleToggle(integration.id)}
                        aria-label={`Toggle ${integration.name} connection`}
                    />
                </div>
                <CardDescription>{integration.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className={`font-medium ${isConnected ? 'text-primary' : 'text-muted-foreground'}`}>
                    {isConnected ? 'Connected' : 'Not Connected'}
                  </span>
                   <Button variant="outline" size="sm" disabled={!isConnected}>
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
