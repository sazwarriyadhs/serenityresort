'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download } from 'lucide-react';

const checkInData = [
  { id: 'BK001', guestName: 'Alice Johnson', checkInDate: '2024-07-20', room: '101', status: 'Checked In' },
  { id: 'BK002', guestName: 'Robert Smith', checkInDate: '2024-07-20', room: '205', status: 'Checked In' },
  { id: 'BK003', guestName: 'Maria Garcia', checkInDate: '2024-07-19', room: '312', status: 'Checked Out' },
  { id: 'BK004', guestName: 'James Williams', checkInDate: '2024-07-21', room: '102', status: 'Upcoming' },
  { id: 'BK005', guestName: 'Patricia Brown', checkInDate: '2024-07-18', room: '401', status: 'Checked Out' },
  { id: 'BK006', guestName: 'John Davis', checkInDate: '2024-07-22', room: '208', status: 'Upcoming' },
];

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
