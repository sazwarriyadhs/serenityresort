'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BedDouble, PlusCircle } from 'lucide-react';

type Room = {
  id: string;
  roomNumber: string;
  type: 'Single' | 'Double' | 'Suite';
  status: 'Available' | 'Occupied' | 'Cleaning' | 'Maintenance';
  price: number;
};

const roomTypesList = ['Single', 'Double', 'Suite'] as const;
const roomStatuses = ['Available', 'Occupied', 'Cleaning', 'Maintenance'] as const;

const initialRooms: Room[] = Array.from({ length: 100 }, (_, i) => {
    const floor = Math.floor(i / 20) + 1;
    const roomNum = floor * 100 + (i % 20) + 1;
    return {
        id: `R${roomNum}`,
        roomNumber: `${roomNum}`,
        type: roomTypesList[i % roomTypesList.length],
        status: roomStatuses[i % roomStatuses.length],
        price: 150 + Math.floor(Math.random() * (i % 3 === 0 ? 250 : 70))
    };
});

export default function RoomManagementPage() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);

  const getStatusVariant = (status: Room['status']) => {
    switch (status) {
      case 'Available':
        return 'default';
      case 'Occupied':
        return 'destructive';
      case 'Cleaning':
        return 'secondary';
      case 'Maintenance':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline text-foreground">Room Management</h1>
          <p className="text-muted-foreground">Oversee all hotel rooms and their statuses.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2" />
          Add New Room
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Room Roster</CardTitle>
          <CardDescription>A complete list of all rooms in the hotel.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room Number</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Price/Night</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium flex items-center gap-2"><BedDouble className="h-4 w-4 text-muted-foreground" /> {room.roomNumber}</TableCell>
                  <TableCell>{room.type}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(room.status)}>{room.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">${room.price.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
