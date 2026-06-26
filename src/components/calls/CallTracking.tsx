import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Play, Clock, User, Phone, Mail, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Call, CallHistoryEvent } from "@/types/calls";
import {
  formatCallDuration,
  formatRelativeTime,
  getCallStatusColor,
} from "@/utils/callsUtils";

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
    assignedToUserId: 1,
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
    assignedToUserId: 2,
    recorded: false,
    recordingUrl: null,
    notes: "Follow up required",
    status: "Completed",
    source: "Referral",
    createdById: 1,
    createdAt: new Date(Date.now() - 7200000),
    updatedAt: new Date(Date.now() - 7200000),
  },
  {
    id: 3,
    callId: "CALL-1719407200-789",
    contactName: "Charlie Davis",
    contactPhone: "5550103",
    contactEmail: "charlie@example.com",
    callType: "Incoming",
    durationSeconds: 0,
    callDate: new Date(Date.now() - 10800000),
    assignedToUserId: null,
    recorded: false,
    recordingUrl: null,
    notes: null,
    status: "Missed",
    source: "Website",
    createdById: 1,
    createdAt: new Date(Date.now() - 10800000),
    updatedAt: new Date(Date.now() - 10800000),
  },
];

const mockHistory: CallHistoryEvent[] = [
  {
    id: 1,
    callId: 1,
    eventType: "Created",
    eventDescription: "Call record created",
    changedById: 1,
    previousValue: null,
    newValue: null,
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: 2,
    callId: 1,
    eventType: "Assigned",
    eventDescription: "Call assigned to john_doe",
    changedById: 2,
    previousValue: null,
    newValue: "1",
    createdAt: new Date(Date.now() - 3500000),
  },
  {
    id: 3,
    callId: 1,
    eventType: "Follow-up",
    eventDescription: "Follow-up scheduled for tomorrow",
    changedById: 1,
    previousValue: null,
    newValue: null,
    createdAt: new Date(Date.now() - 3400000),
  },
  {
    id: 4,
    callId: 1,
    eventType: "Lead",
    eventDescription: "Lead created from this call",
    changedById: 1,
    previousValue: null,
    newValue: null,
    createdAt: new Date(Date.now() - 3300000),
  },
];

interface CallRecordViewerProps {
  call: Call;
}

function CallRecordViewer({ call }: CallRecordViewerProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Contact Name</p>
          <p className="font-medium flex items-center gap-2">
            <User className="h-4 w-4" />
            {call.contactName}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium flex items-center gap-2">
            <Phone className="h-4 w-4" />
            {call.contactPhone}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium flex items-center gap-2">
            <Mail className="h-4 w-4" />
            {call.contactEmail}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Duration</p>
          <p className="font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {formatCallDuration(call.durationSeconds)}
          </p>
        </div>
      </div>
      {call.recorded && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium mb-2">Recording</p>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm">
              <Play className="mr-2 h-4 w-4" />
              Play
            </Button>
            <span className="text-sm text-gray-500">3:00</span>
          </div>
        </div>
      )}
      {call.notes && (
        <div>
          <p className="text-sm text-gray-500 mb-1">Notes</p>
          <div className="bg-gray-50 p-3 rounded-lg text-sm">{call.notes}</div>
        </div>
      )}
      <div>
        <p className="text-sm text-gray-500 mb-2">Call History</p>
        <div className="space-y-2">
          {mockHistory.map((event) => (
            <div key={event.id} className="flex items-start gap-3 text-sm">
              <div className="mt-1 w-2 h-2 rounded-full bg-blue-500" />
              <div>
                <p className="font-medium">{event.eventType}</p>
                <p className="text-gray-500">{event.eventDescription}</p>
                <p className="text-xs text-gray-400">{formatRelativeTime(event.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface CallTrackingProps {
  calls: Call[];
}

export function CallTracking({ calls = mockCalls }: CallTrackingProps) {
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {calls.map((call) => (
          <Card key={call.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{call.contactName}</h4>
                    <p className="text-sm text-gray-500">{call.contactPhone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{call.callType}</p>
                    <p className="font-medium">{formatCallDuration(call.durationSeconds)}</p>
                  </div>
                  <Badge className={getCallStatusColor(call.status)}>{call.status}</Badge>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCall(call);
                        }}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Call Record Details</DialogTitle>
                        <DialogDescription>View complete call information and history</DialogDescription>
                      </DialogHeader>
                      {selectedCall && <CallRecordViewer call={selectedCall} />}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-500 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {formatRelativeTime(call.callDate)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
