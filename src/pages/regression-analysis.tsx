import dynamic from "next/dynamic";

import { VerticalLayout } from "@/components/VerticalLayout";

// Dynamically import your CRA's App component with SSR disabled
const PerformanceMockup = dynamic(() => import("../components/PerformanceMockup"), { ssr: false });

export default function RegressionAnalysis() {
  return <PerformanceMockup />;
}

RegressionAnalysis.Layout = VerticalLayout;
