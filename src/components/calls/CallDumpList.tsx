import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDumpStatusColor, formatRelativeTime } from "@/utils/callsUtils";
import type { CallDump } from "@/types/calls";

const mockDumps: CallDump[] = [
  {
    id: 1,
    dumpId: "DUMP-1719400000-ABC123",
    dumpName: "June 17 Morning Calls",
    totalContacts: 150,
    processedContacts: 150,
    status: "Completed",
    fileUrl: null,
    uploadedById: 1,
    uploadDate: new Date(Date.now() - 86400000),
    processedDate: new Date(Date.now() - 86300000),
    errorMessage: null,
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86300000),
  },
  {
    id: 2,
    dumpId: "DUMP-1719313600-DEF456",
    dumpName: "June 16 Afternoon Calls",
    totalContacts: 200,
    processedContacts: 180,
    status: "Processing",
    fileUrl: null,
    uploadedById: 1,
    uploadDate: new Date(Date.now() - 172800000),
    processedDate: null,
    errorMessage: null,
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 172000000),
  },
  {
    id: 3,
    dumpId: "DUMP-1719227200-GHI789",
    dumpName: "June 15 Calls",
    totalContacts: 100,
    processedContacts: 0,
    status: "Failed",
    fileUrl: null,
    uploadedById: 1,
    uploadDate: new Date(Date.now() - 259200000),
    processedDate: null,
    errorMessage: "Invalid CSV format",
    createdAt: new Date(Date.now() - 259200000),
    updatedAt: new Date(Date.now() - 259000000),
  },
];

interface CallDumpListProps {
  onSelectDump?: (dump: CallDump) => void;
}

export function CallDumpList({ onSelectDump }: CallDumpListProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Call Dumps</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dump Name</TableHead>
              <TableHead>Contacts</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead>Error</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDumps.map((dump) => (
              <TableRow
                key={dump.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => onSelectDump?.(dump)}
              >
                <TableCell className="font-medium">{dump.dumpName}</TableCell>
                <TableCell>
                  {dump.processedContacts}/{dump.totalContacts}
                </TableCell>
                <TableCell>
                  <Badge className={getDumpStatusColor(dump.status)}>
                    {dump.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatRelativeTime(dump.uploadDate)}</TableCell>
                <TableCell className="text-red-600">
                  {dump.errorMessage || "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
