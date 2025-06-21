'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { columns, InventoryItem } from './columns';
import { DataTable } from './data-table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const inventorySchema = z.object({
  name: z.string().min(2, { message: 'Item name must be at least 2 characters.' }),
  category: z.string().min(2, { message: 'Category must be at least 2 characters.' }),
  quantity: z.coerce.number().min(0, { message: 'Quantity cannot be negative.' }),
  reorderLevel: z.coerce.number().min(0, { message: 'Reorder level cannot be negative.' }),
});

const initialInventory: InventoryItem[] = [
  { id: '1', name: 'Linen Sheets', category: 'Room Supplies', quantity: 100, reorderLevel: 20 },
  { id: '2', name: 'Shampoo Bottles', category: 'Amenities', quantity: 50, reorderLevel: 50 },
  { id: '3', name: 'Coffee Pods', category: 'Amenities', quantity: 200, reorderLevel: 40 },
  { id: '4', name: 'Fresh Salmon', category: 'Kitchen', quantity: 15, reorderLevel: 10 },
  { id: '5', name: 'Light Bulbs', category: 'Maintenance', quantity: 5, reorderLevel: 10 },
  { id: '6', name: 'Cleaning Solution', category: 'Housekeeping', quantity: 0, reorderLevel: 5 },
];

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const form = useForm<z.infer<typeof inventorySchema>>({
    resolver: zodResolver(inventorySchema),
    defaultValues: { name: '', category: '', quantity: 0, reorderLevel: 10 },
  });

  const handleDialogOpen = (item: InventoryItem | null = null) => {
    setEditingItem(item);
    if (item) {
      form.reset({ name: item.name, category: item.category, quantity: item.quantity, reorderLevel: item.reorderLevel });
    } else {
      form.reset({ name: '', category: '', quantity: 0, reorderLevel: 10 });
    }
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
    form.reset();
  };

  const onSubmit = (values: z.infer<typeof inventorySchema>) => {
    if (editingItem) {
      setInventory(inventory.map(i => i.id === editingItem.id ? { ...i, ...values } : i));
    } else {
      const newItem = { id: (inventory.length + 1).toString(), ...values };
      setInventory([...inventory, newItem]);
    }
    handleDialogClose();
  };
  
  const handleDeleteItem = (itemId: string) => {
    setInventory(inventory.filter(i => i.id !== itemId));
  }

  const inventoryColumns = columns(handleDialogOpen, handleDeleteItem);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-bold font-headline text-foreground">Inventory & Stock Management</h1>
            <p className="text-muted-foreground">Track and manage your hotel's inventory.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleDialogOpen(null)}>
              <PlusCircle className="mr-2" />
              New Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-headline">{editingItem ? 'Edit Item' : 'Create New Item'}</DialogTitle>
              <DialogDescription>
                {editingItem ? 'Update the details for this item.' : 'Fill in the details for the new inventory item.'}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Name</FormLabel>
                      <FormControl><Input placeholder="Linen Sheets" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl><Input placeholder="Room Supplies" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField control={form.control} name="quantity" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl><Input type="number" placeholder="100" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField control={form.control} name="reorderLevel" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reorder Level</FormLabel>
                      <FormControl><Input type="number" placeholder="20" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="button" variant="ghost" onClick={handleDialogClose}>Cancel</Button>
                  <Button type="submit">Save Item</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable columns={inventoryColumns} data={inventory} />
    </div>
  );
}
