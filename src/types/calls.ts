export type CallType = "Incoming" | "Outgoing";
export type CallStatus = "Completed" | "Missed" | "Pending";
export type DumpStatus = "Pending" | "Processing" | "Completed" | "Failed";
export type AssignmentStatus = "Active" | "Completed" | "Reassigned";
export type FollowupType = "Call" | "Email" | "SMS" | "Meeting" | "Other";
export type FollowupStatus = "Pending" | "Completed" | "Cancelled";
export type LeadStatus = "New" | "Contacted" | "Qualified" | "Converted" | "Lost";
export type UserRole = "Admin" | "Manager" | "User" | "HeadEngineer" | "StoreManager";
export type Priority = "Low" | "Normal" | "High" | "Urgent";
export type TimeRange = "Today" | "Week" | "Month";

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Call {
  id: number;
  callId: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  callType: CallType;
  durationSeconds: number;
  callDate: Date;
  assignedToUserId: number | null;
  recorded: boolean;
  recordingUrl: string | null;
  notes: string | null;
  status: CallStatus;
  source: string;
  createdById: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CallDump {
  id: number;
  dumpId: string;
  dumpName: string;
  totalContacts: number;
  processedContacts: number;
  status: DumpStatus;
  fileUrl: string | null;
  uploadedById: number;
  uploadDate: Date;
  processedDate: Date | null;
  errorMessage: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CallAssignment {
  id: number;
  assignmentId: string;
  callId: number;
  assignedById: number;
  assignedToId: number;
  assignmentDate: Date;
  priority: Priority;
  notes: string | null;
  status: AssignmentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface FollowUp {
  id: number;
  followupId: string;
  callId: number;
  userId: number;
  followupType: FollowupType;
  scheduledDate: Date;
  completedDate: Date | null;
  notes: string | null;
  status: FollowupStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CallLead {
  id: number;
  leadId: string;
  callId: number;
  createdById: number;
  leadName: string;
  leadEmail: string;
  leadPhone: string;
  companyName: string | null;
  status: LeadStatus;
  leadSource: string;
  value: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CallMetrics {
  id: number;
  metricDate: Date;
  userId: number | null;
  totalCalls: number;
  totalCallDurationMinutes: number;
  followupCompleted: number;
  leadsCreated: number;
  leadConversionRate: number;
  averageCallDurationSeconds: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CallHistoryEvent {
  id: number;
  callId: number;
  eventType: string;
  eventDescription: string;
  changedById: number | null;
  previousValue: string | null;
  newValue: string | null;
  createdAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string | null;
  errors: string[] | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface DashboardMetrics {
  totalCalls: number;
  totalDurationMinutes: number;
  followupsCompleted: number;
  leadsCreated: number;
  conversionRate: number;
  averageCallDurationSeconds: number;
  activityData: { date: string; count: number }[];
  durationTrend: { date: string; duration: number }[];
  leadFunnel: { stage: string; count: number }[];
  teamPerformance: { userId: number; username: string; calls: number; duration: number; followups: number; leads: number }[];
  callTypeDistribution: { type: CallType; count: number; percentage: number }[];
}

export interface CreateCallDumpForm {
  dumpName: string;
  file: File;
}

export interface AssignCallForm {
  callIds: number[];
  assignedToId: number;
  priority: Priority;
  notes: string | null;
}

export interface CreateFollowupForm {
  callId: number;
  followupType: FollowupType;
  scheduledDate: Date;
  notes: string | null;
}

export interface CreateLeadForm {
  callId: number;
  leadName: string;
  leadEmail: string;
  leadPhone: string;
  companyName: string | null;
  leadSource: string;
  value: number | null;
}
