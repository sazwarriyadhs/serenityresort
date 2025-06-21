'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Utensils } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

type MenuItem = {
  id: string;
  name: string;
  category: 'Appetizer' | 'Main Course' | 'Dessert' | 'Beverage';
  price: number;
  available: boolean;
};

const menuCategoriesList = ['Appetizer', 'Main Course', 'Dessert', 'Beverage'] as const;
const foodNames = ["Salad", "Steak", "Soup", "Cake", "Pasta", "Fish", "Chicken", "Juice", "Coffee"];
const initialMenu: MenuItem[] = Array.from({ length: 100 }, (_, i) => ({
    id: `M${String(i + 1).padStart(3, '0')}`,
    name: `${foodNames[Math.floor(Math.random() * foodNames.length)]} ${i + 1}`,
    category: menuCategoriesList[i % menuCategoriesList.length],
    price: parseFloat((10 + Math.random() * 90).toFixed(2)),
    available: Math.random() > 0.15
}));

export default function RestaurantManagementPage() {
  const [menu, setMenu] = useState<MenuItem[]>(initialMenu);

  const toggleAvailability = (id: string) => {
    setMenu(menu.map(item => item.id === id ? { ...item, available: !item.available } : item));
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline text-foreground">Restaurant Management</h1>
          <p className="text-muted-foreground">Manage your menu, orders, and reservations.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2" />
          Add Menu Item
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Menu Items</CardTitle>
          <CardDescription>A list of all items available in the restaurant.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-center">Available</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menu.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium flex items-center gap-2"><Utensils className="h-4 w-4 text-muted-foreground" /> {item.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center space-x-2">
                       <Switch
                        id={`available-${item.id}`}
                        checked={item.available}
                        onCheckedChange={() => toggleAvailability(item.id)}
                        aria-label={`Toggle availability for ${item.name}`}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
