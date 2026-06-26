import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Phone, Mail, MessageSquare, Users, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import type {
  Call,
  FollowUp,
  CallLead,
  FollowupType,
  LeadStatus,
} from "@/types/calls";
import {
  getFollowupStatusColor,
  getLeadStatusColor,
  formatCallDuration,
  formatRelativeTime,
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
];

const mockFollowups: FollowUp[] = [
  {
    id: 1,
    followupId: "FU-1719400000-123",
    callId: 1,
    userId: 1,
    followupType: "Call",
    scheduledDate: new Date(Date.now() + 86400000),
    completedDate: null,
    notes: "Discuss pricing",
    status: "Pending",
    createdAt: new Date(Date.now() - 3600000),
    updatedAt: new Date(Date.now() - 3600000),
  },
];

const mockLeads: CallLead[] = [
  {
    id: 1,
    leadId: "LEAD-1719400000-123",
    callId: 1,
    createdById: 1,
    leadName: "Alice Johnson",
    leadEmail: "alice@example.com",
    leadPhone: "5550101",
    companyName: "Acme Corp",
    status: "New",
    leadSource: "Website",
    value: 5000,
    createdAt: new Date(Date.now() - 3600000),
    updatedAt: new Date(Date.now() - 3600000),
  },
];

export function FollowupAndLeadCreation() {
  const [selectedCall, setSelectedCall] = useState<Call>(mockCalls[0]);
  const [followupType, setFollowupType] = useState<FollowupType>("Call");
  const [followupDate, setFollowupDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split("T")[0]
  );
  const [followupNotes, setFollowupNotes] = useState("");
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadCompany, setLeadCompany] = useState("");
  const [leadSource, setLeadSource] = useState("Website");
  const [leadValue, setLeadValue] = useState("");

  const handleCreateFollowup = () => {
    if (!followupDate) {
      toast.error("Please select a date");
      return;
    }
    toast.success("Follow-up created successfully!");
    setFollowupType("Call");
    setFollowupNotes("");
  };

  const handleCreateLead = () => {
    if (!leadName || !leadEmail || !leadPhone) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Lead created successfully!");
    setLeadName("");
    setLeadEmail("");
    setLeadPhone("");
    setLeadCompany("");
    setLeadValue("");
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Call Details</CardTitle>
          <CardDescription>Manage follow-ups and leads for this call</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Contact Name</p>
              <p className="font-medium">{selectedCall.contactName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{selectedCall.contactPhone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{selectedCall.contactEmail}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">{formatCallDuration(selectedCall.durationSeconds)}</p>
            </div>
          </div>

          <Tabs defaultValue="followup">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="followup">Create Follow-up</TabsTrigger>
              <TabsTrigger value="lead">Create Lead</TabsTrigger>
            </TabsList>

            <TabsContent value="followup" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    value={followupType}
                    onValueChange={(value) => setFollowupType(value as FollowupType)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Call">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Call
                        </div>
                      </SelectItem>
                      <SelectItem value="Email">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email
                        </div>
                      </SelectItem>
                      <SelectItem value="SMS">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          SMS
                        </div>
                      </SelectItem>
                      <SelectItem value="Meeting">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Meeting
                        </div>
                      </SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={followupDate}
                    onChange={(e) => setFollowupDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  value={followupNotes}
                  onChange={(e) => setFollowupNotes(e.target.value)}
                  placeholder="Add notes for follow-up..."
                />
              </div>
              <Button onClick={handleCreateFollowup}>
                <Calendar className="mr-2 h-4 w-4" />
                Create Follow-up
              </Button>

              <div className="pt-4">
                <h4 className="font-medium mb-2">Existing Follow-ups</h4>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Scheduled</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockFollowups.map((fu) => (
                        <TableRow key={fu.id}>
                          <TableCell>{fu.followupType}</TableCell>
                          <TableCell>{formatRelativeTime(fu.scheduledDate)}</TableCell>
                          <TableCell>
                            <Badge className={getFollowupStatusColor(fu.status)}>
                              {fu.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{fu.notes}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="lead" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Lead Name</Label>
                  <Input
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="Enter lead name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="Enter email"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="Enter phone"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    value={leadCompany}
                    onChange={(e) => setLeadCompany(e.target.value)}
                    placeholder="Enter company"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Source</Label>
                  <Select value={leadSource} onValueChange={setLeadSource}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Website">Website</SelectItem>
                      <SelectItem value="Referral">Referral</SelectItem>
                      <SelectItem value="Call">Call</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Value ($)</Label>
                  <Input
                    type="number"
                    value={leadValue}
                    onChange={(e) => setLeadValue(e.target.value)}
                    placeholder="Enter value"
                  />
                </div>
              </div>
              <Button onClick={handleCreateLead}>
                <TrendingUp className="mr-2 h-4 w-4" />
                Create Lead
              </Button>

              <div className="pt-4">
                <h4 className="font-medium mb-2">Existing Leads</h4>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Lead</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockLeads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{lead.leadName}</p>
                              <p className="text-sm text-gray-500">{lead.leadEmail}</p>
                            </div>
                          </TableCell>
                          <TableCell>{lead.companyName}</TableCell>
                          <TableCell>
                            <Badge className={getLeadStatusColor(lead.status)}>
                              {lead.status}
                            </Badge>
                          </TableCell>
                          <TableCell>${lead.value?.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
