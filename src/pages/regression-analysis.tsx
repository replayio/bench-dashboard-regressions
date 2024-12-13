import dynamic from "next/dynamic";

import { VerticalLayout } from "@/components/VerticalLayout";
import { getRecordingId } from "@/performance/params";

// Dynamically import your CRA's App component with SSR disabled
const PerformanceMockup = dynamic(() => import("../components/PerformanceMockup"), { ssr: false });

export default function PerformanceAnalysis() {
  const recordingId = getRecordingId();
  if (!recordingId) {
    return <div>Invalid or missing recordingId</div>;
  }

  return <PerformanceMockup recordingId={recordingId} />;
}

PerformanceAnalysis.Layout = VerticalLayout;
