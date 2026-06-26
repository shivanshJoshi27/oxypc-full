import { useState } from "react";
import { DashboardCharts } from "./DashboardCharts";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, RefreshCw } from "lucide-react";
import type { UserRole, TimeRange } from "@/types/calls";
import { toast } from "sonner";
import { exportToCSV } from "@/utils/callsUtils";

interface CallDashboardProps {
  userRole: UserRole;
  userId: number;
}

export function CallDashboard({ userRole }: CallDashboardProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("Week");

  const handleRefresh = () => {
    toast.success("Dashboard refreshed!");
  };

  const handleExport = () => {
    const mockData = [
      { metric: "Total Calls", value: 373 },
      { metric: "Total Duration", value: "15.5h" },
      { metric: "Follow-ups Completed", value: 60 },
      { metric: "Leads Created", value: 16 },
    ];
    exportToCSV(mockData, `call-dashboard-${Date.now()}.csv`);
    toast.success("Data exported successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Call Dashboard</h1>
          <p className="text-gray-500 mt-1">Monitor call performance and team activity</p>
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={timeRange}
            onValueChange={(value) => setTimeRange(value as TimeRange)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Today">Today</SelectItem>
              <SelectItem value="Week">This Week</SelectItem>
              <SelectItem value="Month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="secondary" onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <DashboardCharts />
    </div>
  );
}
