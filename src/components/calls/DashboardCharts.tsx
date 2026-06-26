import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Phone,
  Clock,
  CheckCircle2,
  TrendingUp,
  Users,
} from "lucide-react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const activityData = [
  { date: "Jun 11", calls: 45 },
  { date: "Jun 12", calls: 52 },
  { date: "Jun 13", calls: 38 },
  { date: "Jun 14", calls: 65 },
  { date: "Jun 15", calls: 48 },
  { date: "Jun 16", calls: 70 },
  { date: "Jun 17", calls: 55 },
];

const durationData = [
  { date: "Jun 11", duration: 120 },
  { date: "Jun 12", duration: 145 },
  { date: "Jun 13", duration: 110 },
  { date: "Jun 14", duration: 160 },
  { date: "Jun 15", duration: 130 },
  { date: "Jun 16", duration: 175 },
  { date: "Jun 17", duration: 140 },
];

const typeData = [
  { name: "Incoming", value: 60, percentage: 60 },
  { name: "Outgoing", value: 40, percentage: 40 },
];

const leadFunnelData = [
  { name: "New", value: 100 },
  { name: "Contacted", value: 80 },
  { name: "Qualified", value: 40 },
  { name: "Converted", value: 20 },
];

const teamPerformanceData = [
  { userId: 1, username: "john_doe", calls: 45, duration: 120, followups: 20, leads: 5 },
  { userId: 2, username: "jane_smith", calls: 60, duration: 150, followups: 25, leads: 8 },
  { userId: 3, username: "bob_wilson", calls: 35, duration: 90, followups: 15, leads: 3 },
];

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: number;
}

function KPICard({ title, value, icon, description, trend }: KPICardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
        {trend !== undefined && (
          <p className={`text-xs mt-1 ${trend > 0 ? "text-green-600" : "text-red-600"}`}>
            {trend > 0 ? "+" : ""}{trend}% from last week
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function DashboardCharts() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Calls"
          value="373"
          icon={<Phone className="h-4 w-4 text-gray-500" />}
          trend={12}
        />
        <KPICard
          title="Total Duration"
          value="15.5h"
          icon={<Clock className="h-4 w-4 text-gray-500" />}
          trend={8}
        />
        <KPICard
          title="Follow-ups Completed"
          value="60"
          icon={<CheckCircle2 className="h-4 w-4 text-gray-500" />}
          trend={15}
        />
        <KPICard
          title="Leads Created"
          value="16"
          icon={<TrendingUp className="h-4 w-4 text-gray-500" />}
          trend={5}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>7-Day Call Activity</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calls" fill="#0088FE" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Call Duration Trend (min)</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={durationData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="duration" stroke="#00C49F" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip />
                <Funnel data={leadFunnelData} dataKey="value">
                  <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                  {leadFunnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Call Type Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 text-sm font-medium text-gray-500">User</th>
                  <th className="text-left py-2 px-4 text-sm font-medium text-gray-500">Calls</th>
                  <th className="text-left py-2 px-4 text-sm font-medium text-gray-500">Duration (min)</th>
                  <th className="text-left py-2 px-4 text-sm font-medium text-gray-500">Follow-ups</th>
                  <th className="text-left py-2 px-4 text-sm font-medium text-gray-500">Leads</th>
                </tr>
              </thead>
              <tbody>
                {teamPerformanceData.map((member) => (
                  <tr key={member.userId} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{member.username}</td>
                    <td className="py-3 px-4">{member.calls}</td>
                    <td className="py-3 px-4">{member.duration}</td>
                    <td className="py-3 px-4">{member.followups}</td>
                    <td className="py-3 px-4">{member.leads}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
