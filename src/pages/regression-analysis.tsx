import dynamic from "next/dynamic";

import { VerticalLayout } from "@/components/VerticalLayout";

// Dynamically import your CRA's App component with SSR disabled
const RegressionMockup = dynamic(() => import("../components/RegressionMockup"), { ssr: false });

export default function RegressionAnalysis() {
  return <RegressionMockup />;
}

RegressionAnalysis.Layout = VerticalLayout;
