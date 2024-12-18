import { PerformanceAnalysisResult } from "../performance/interfaceTypes";
import { RecordingDisplay } from "./performance/RecordingDisplay";
import { RegressionOriginDisplay } from "./performance/RegressionOriginDisplay";
import { useEffect, useState } from "react";
import { fetchPerformanceResult } from "@/performance/performanceResult";
import { getRecordingId } from "@/performance/params";
import { assert } from "@/performance/utils";
import { WorkspaceData, fetchWorkspaceData, getMainBranchRecordings, getRecordingData } from "@/performance/workspaceData";
import { NetworkDataComparison, TimingComparison } from "./performance/PerformanceComparison";

export default function RegressionMockup() {
  const [result, setResult] = useState<PerformanceAnalysisResult | string | null>(null);
  const [workspaceData, setWorkspaceData] = useState<WorkspaceData | null>(null);
  const [mainBranchResults, setMainBranchResults] = useState<PerformanceAnalysisResult[]>([]);

  useEffect(() => {
    const recordingId = getRecordingId();
    if (!recordingId) {
      setResult("Invalid or missing recordingId");
      return;
    }

    if (!result) {
      fetchPerformanceResult(recordingId).then(setResult);
    }

    if (typeof result === "object" && result?.analysisResult?.spec?.metadata?.workspaceId && !workspaceData) {
      const workspaceId = result.analysisResult.spec.metadata.workspaceId;
      fetchWorkspaceData(workspaceId).then(setWorkspaceData);
    }

    if (workspaceData && !mainBranchResults.length && typeof result === "object") {
      const recordingData = getRecordingData(workspaceData, recordingId);
      if (recordingData) {
        const mainRecordings = getMainBranchRecordings(workspaceData, recordingData.timestamp);
        Promise.all(mainRecordings.map(r => fetchPerformanceResult(r.recordingId)))
          .then(results => setMainBranchResults(results.filter((r): r is PerformanceAnalysisResult => typeof r === "object")));
      }
    }
  }, [result, workspaceData, mainBranchResults.length]);

  if (!result) {
    return <div className="Status">Loading...</div>;
  }

  if (typeof result == "string") {
    return <div className="Status">{result}</div>;
  }

  const recordingId = getRecordingId();
  assert(recordingId);

  const { analysisResult } = result;
  if (!analysisResult) {
    return <div className="Status">Invalid analysis result format</div>;
  }

  const { recordingURL, summaries } = analysisResult;

  const mainBranchSummaries = mainBranchResults.map(r => r.analysisResult?.summaries || []).flat();

  return (
    <div className="App h-screen w-screen flex flex-col text-xl">
      <h1 className="text-5xl self-center">Regression Analysis</h1>
      <div className="self-center">
        <div className="flex items-baseline gap-2">
          <h3 className="font-semibold">Recording:</h3>
          <RecordingDisplay recordingId={recordingId} recordingURL={recordingURL} />
        </div>
        <div className="flex items-baseline gap-2 mt-4">
          <h3 className="font-semibold">Compared With:</h3>
          {mainBranchResults.map((result, index) => (
            <span key={index}>
              <RecordingDisplay 
                recordingId={result.analysisResult?.spec.recordingId || ''} 
                recordingURL={result.analysisResult?.recordingURL || ''}
              />
              {index < mainBranchResults.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      </div>
      <div className="m-4 overflow-y-auto">
        {summaries.map((summary, index) => {
          const mainBranchTimings = mainBranchSummaries
            .filter(s => s.origin.kind === summary.origin.kind)
            .map(s => ({
              total: s.elapsed,
              network: s.networkTime,
              scheduling: s.schedulingTime,
              mainThread: s.mainThreadTime,
              workerThread: s.workerThreadTime,
              timer: s.timerTime,
              unknown: s.unknownTime
            }));

          const mainBranchNetworkData = mainBranchSummaries
            .filter(s => s.origin.kind === summary.origin.kind)
            .map(s => s.networkDataByExtension || {});

          return (
            <div key={index} className="mb-8 p-4 border rounded-lg">
              <RegressionOriginDisplay summary={summary} />
            </div>
          );
        })}
      </div>

      <div className="Footer"></div>
    </div>
  );
}
