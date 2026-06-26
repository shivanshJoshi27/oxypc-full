import { createFileRoute } from "@tanstack/react-router";
import { CallDashboard } from "@/components/calls";

export const Route = createFileRoute("/calls/dashboard")({
  component: CallDashboardPage,
});

function CallDashboardPage() {
  return <CallDashboard userRole="Manager" userId={1} />;
}
