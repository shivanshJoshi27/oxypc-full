import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CallTracking } from "./CallTracking";
import { Search, Filter, Download, Phone, Clock, CheckCircle2, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { exportToCSV } from "@/utils/callsUtils";
import type { UserRole, CallStatus, CallType } from "@/types/calls";

interface CallMonitoringAndTrackingProps {
  userRole: UserRole;
  userId: number;
}

export function CallMonitoringAndTracking({ userRole }: CallMonitoringAndTrackingProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<CallStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<CallType | "all">("all");

  const handleExport = () => {
    const mockData = [
      { contactName: "Alice Johnson", phone: "5550101", type: "Incoming", status: "Completed" },
      { contactName: "Bob Brown", phone: "5550102", type: "Outgoing", status: "Completed" },
    ];
    exportToCSV(mockData, `call-records-${Date.now()}.csv`);
    toast.success("Records exported successfully!");
  };

  const stats = [
    { title: "Total Calls", value: "373", icon: <Phone className="h-4 w-4" /> },
    { title: "Avg Duration", value: "3:20", icon: <Clock className="h-4 w-4" /> },
    { title: "Completed", value: "320", icon: <CheckCircle2 className="h-4 w-4" /> },
    { title: "Missed", value: "53", icon: <TrendingUp className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Call Monitoring & Tracking</h1>
          <p className="text-gray-500 mt-1">View and manage all call records and history</p>
        </div>
        <Button onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Call Records</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search calls..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as CallStatus | "all")}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Missed">Missed</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={typeFilter}
                onValueChange={(value) => setTypeFilter(value as CallType | "all")}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Incoming">Incoming</SelectItem>
                  <SelectItem value="Outgoing">Outgoing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CallTracking />
        </CardContent>
      </Card>
    </div>
  );
}
