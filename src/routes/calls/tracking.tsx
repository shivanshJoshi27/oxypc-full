import { createFileRoute } from "@tanstack/react-router";
import { CallMonitoringAndTracking } from "@/components/calls";

export const Route = createFileRoute("/calls/tracking")({
  component: CallTrackingPage,
});

function CallTrackingPage() {
  return <CallMonitoringAndTracking userRole="Manager" userId={1} />;
}
