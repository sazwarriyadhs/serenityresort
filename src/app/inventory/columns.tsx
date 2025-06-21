'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export type InventoryItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  reorderLevel: number;
};

const getStatus = (quantity: number, reorderLevel: number): { text: string; variant: 'default' | 'secondary' | 'destructive' } => {
  if (quantity === 0) return { text: 'Out of Stock', variant: 'destructive' };
  if (quantity <= reorderLevel) return { text: 'Low Stock', variant: 'secondary' };
  return { text: 'In Stock', variant: 'default' };
};

export const columns = (
    onEdit: (item: InventoryItem) => void,
    onDelete: (itemId: string) => void
  ): ColumnDef<InventoryItem>[] => [
  {
    accessorKey: 'name',
    header: 'Item Name',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'quantity',
    header: () => <div className="text-right">Quantity</div>,
    cell: ({ row }) => {
      const quantity = parseFloat(row.getValue('quantity'));
      return <div className="text-right font-medium">{quantity}</div>;
    },
  },
  {
    accessorKey: 'reorderLevel',
    header: () => <div className="text-right">Reorder Level</div>,
     cell: ({ row }) => {
      const reorderLevel = parseFloat(row.getValue('reorderLevel'));
      return <div className="text-right font-medium">{reorderLevel}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const item = row.original;
      const status = getStatus(item.quantity, item.reorderLevel);
      return <Badge variant={status.variant}>{status.text}</Badge>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit(item)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Item
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive focus:bg-destructive/10"
                onClick={() => onDelete(item.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Item
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
