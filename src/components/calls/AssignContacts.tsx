import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import type { Call, User, Priority } from "@/types/calls";
import { getPriorityColor } from "@/utils/callsUtils";
import { Badge } from "@/components/ui/badge";

const mockUsers: User[] = [
  { id: 1, username: "john_doe", email: "john@example.com", role: "User", createdAt: new Date(), updatedAt: new Date() },
  { id: 2, username: "jane_smith", email: "jane@example.com", role: "User", createdAt: new Date(), updatedAt: new Date() },
  { id: 3, username: "bob_wilson", email: "bob@example.com", role: "User", createdAt: new Date(), updatedAt: new Date() },
];

const mockCalls: Call[] = [
  {
    id: 1,
    callId: "CALL-1719400000-123",
    contactName: "Alice Johnson",
    contactPhone: "5550101",
    contactEmail: "alice@example.com",
    callType: "Incoming",
    durationSeconds: 180,
    callDate: new Date(Date.now() - 3600000),
    assignedToUserId: null,
    recorded: true,
    recordingUrl: null,
    notes: "Interested in product",
    status: "Completed",
    source: "Website",
    createdById: 1,
    createdAt: new Date(Date.now() - 3600000),
    updatedAt: new Date(Date.now() - 3600000),
  },
  {
    id: 2,
    callId: "CALL-1719403600-456",
    contactName: "Bob Brown",
    contactPhone: "5550102",
    contactEmail: "bob@example.com",
    callType: "Outgoing",
    durationSeconds: 240,
    callDate: new Date(Date.now() - 7200000),
    assignedToUserId: null,
    recorded: false,
    recordingUrl: null,
    notes: "Follow up required",
    status: "Completed",
    source: "Referral",
    createdById: 1,
    createdAt: new Date(Date.now() - 7200000),
    updatedAt: new Date(Date.now() - 7200000),
  },
];

interface AssignContactsProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AssignContacts({ open, onOpenChange }: AssignContactsProps) {
  const [selectedCallIds, setSelectedCallIds] = useState<number[]>([]);
  const [assignedToId, setAssignedToId] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("Normal");
  const [notes, setNotes] = useState("");

  const handleToggleCall = (callId: number) => {
    setSelectedCallIds((prev) =>
      prev.includes(callId) ? prev.filter((id) => id !== callId) : [...prev, callId]
    );
  };

  const handleAssign = () => {
    if (!assignedToId || selectedCallIds.length === 0) {
      toast.error("Please select at least one call and a user");
      return;
    }
    toast.success(`Assigned ${selectedCallIds.length} call(s) successfully!`);
    onOpenChange?.(false);
    setSelectedCallIds([]);
    setAssignedToId("");
    setPriority("Normal");
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Assign Contacts</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Assign Contacts</DialogTitle>
          <DialogDescription>Select calls and assign them to a team member</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Assign To</Label>
              <Select value={assignedToId} onValueChange={setAssignedToId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  {mockUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.username}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select
                value={priority}
                onValueChange={(value) => setPriority(value as Priority)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes..."
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Select Calls ({selectedCallIds.length} selected)</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setSelectedCallIds(
                    selectedCallIds.length === mockCalls.length
                      ? []
                      : mockCalls.map((c) => c.id)
                  )
                }
              >
                {selectedCallIds.length === mockCalls.length ? "Deselect All" : "Select All"}
              </Button>
            </div>
            <div className="border rounded-lg max-h-64 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCalls.map((call) => (
                    <TableRow key={call.id} className={call.assignedToUserId ? "opacity-50" : ""}>
                      <TableCell>
                        <Checkbox
                          checked={selectedCallIds.includes(call.id)}
                          onCheckedChange={() => handleToggleCall(call.id)}
                          disabled={call.assignedToUserId !== null}
                        />
                      </TableCell>
                      <TableCell>{call.contactName}</TableCell>
                      <TableCell>{call.contactPhone}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{call.callType}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Priority:</span>
            <Badge className={getPriorityColor(priority)}>{priority}</Badge>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => onOpenChange?.(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleAssign}>
            Assign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
