import { useState } from "react";
import { CallDumpUpload } from "./CallDumpUpload";
import { CallDumpList } from "./CallDumpList";
import { AssignContacts } from "./AssignContacts";
import { FollowupAndLeadCreation } from "./FollowupAndLeadCreation";
import type { UserRole } from "@/types/calls";

interface CallDumpModuleProps {
  userRole: UserRole;
  currentUserId: number;
}

export function CallDumpModule({ userRole }: CallDumpModuleProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "list" | "actions">("list");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Call Dump Module</h1>
        {userRole === "Manager" && <AssignContacts />}
      </div>

      <div className="flex gap-4 border-b">
        <button
          className={`pb-2 px-4 border-b-2 ${
            activeTab === "list" ? "border-primary text-primary" : "border-transparent text-gray-500"
          }`}
          onClick={() => setActiveTab("list")}
        >
          Call Dumps
        </button>
        {userRole === "Manager" && (
          <button
            className={`pb-2 px-4 border-b-2 ${
              activeTab === "upload" ? "border-primary text-primary" : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab("upload")}
          >
            Upload Dump
          </button>
        )}
        <button
          className={`pb-2 px-4 border-b-2 ${
            activeTab === "actions" ? "border-primary text-primary" : "border-transparent text-gray-500"
          }`}
          onClick={() => setActiveTab("actions")}
        >
          Follow-ups & Leads
        </button>
      </div>

      {activeTab === "list" && <CallDumpList />}
      {activeTab === "upload" && <CallDumpUpload />}
      {activeTab === "actions" && <FollowupAndLeadCreation />}
    </div>
  );
}
