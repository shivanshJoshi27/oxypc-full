import { createFileRoute } from "@tanstack/react-router";
import { CallDumpModule } from "@/components/calls";

export const Route = createFileRoute("/calls/dump")({
  component: CallDumpPage,
});

function CallDumpPage() {
  return <CallDumpModule userRole="Manager" currentUserId={1} />;
}
