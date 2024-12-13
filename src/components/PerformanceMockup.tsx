import { PerformanceAnalysisResult } from "../performance/interfaceTypes";

import { RecordingDisplay } from "./performance/RecordingDisplay";
import { OriginDisplay } from "./performance/OriginDisplay";
import { useEffect, useState } from "react";
import { fetchPerformanceResult } from "@/performance/performanceResult";

interface PerformanceMockupProps {
  recordingId: string;
}

export default function PerformanceMockup({ recordingId }: PerformanceMockupProps) {
  const [result, setResult] = useState<PerformanceAnalysisResult | string | null>(null);

  useEffect(() => {
    if (!result) {
      fetchPerformanceResult(recordingId).then(setResult);
    }
  }, [recordingId]);

  if (!result) {
    return <div className="Status">Loading...</div>;
  }

  if (typeof result == "string") {
    return <div className="Status">{result}</div>;
  }

  const { recordingURL } = result;

  return (
    <div className="App h-screen w-screen flex flex-col text-xl">
      <h1 className="text-5xl self-center">Recording Performance Analysis</h1>
      <div className="self-center">
        <RecordingDisplay recordingId={recordingId} recordingURL={recordingURL}></RecordingDisplay>
      </div>
      <div className="m-4 overflow-y-auto">
        {result.summaries.map((summary, index) => {
          const props = { summary };
          return <OriginDisplay key={index} {...props}></OriginDisplay>;
        })}
      </div>

      <div className="Footer"></div>
    </div>
  );
}
