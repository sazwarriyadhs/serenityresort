'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download } from 'lucide-react';

const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
const reportStatuses = ['Checked In', 'Checked Out', 'Upcoming'] as const;

const checkInData = Array.from({ length: 100 }, (_, i) => {
    const guestName = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    const floor = Math.floor(Math.random() * 5) + 1;
    const roomNumOnFloor = Math.floor(Math.random() * 20) + 1;
    return {
        id: `BK${String(i + 1).padStart(3, '0')}`,
        guestName: guestName,
        checkInDate: `2024-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        room: `${floor * 100 + roomNumOnFloor}`,
        status: reportStatuses[i % reportStatuses.length]
    };
});

export default function ReportsPage() {
  const handleDownload = () => {
    const headers = ['ID', 'Guest Name', 'Check-in Date', 'Room', 'Status'];
    const csvRows = [
      headers.join(','),
      ...checkInData.map(row => 
        [row.id, `"${row.guestName}"`, row.checkInDate, row.room, row.status].join(',')
      )
    ];

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'check-in-report.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold font-headline text-foreground">Reports</h1>
            <p className="text-muted-foreground">Generate and download reports for hotel activities.</p>
        </div>
        <Button onClick={handleDownload}>
          <Download className="mr-2" />
          Download CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Recent Check-in Report</CardTitle>
          <CardDescription>A summary of recent and upcoming guest check-ins.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Guest Name</TableHead>
                <TableHead>Check-in Date</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {checkInData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.guestName}</TableCell>
                  <TableCell>{item.checkInDate}</TableCell>
                  <TableCell>{item.room}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
