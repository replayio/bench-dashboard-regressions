import {
  PerformanceAnalysisResult,
  PerformanceAnalysisVersion,
  DependencyGraphVersion,
} from "./interfaceTypes";
import { processOriginSummaries } from "./networkAnalysis";

export function getPerformanceCacheFilename(recordingId: string) {
  const filename = `performance-v${PerformanceAnalysisVersion}-v${DependencyGraphVersion}-${recordingId}.json`;
  return filename;
}

export async function fetchPerformanceResult(
  recordingId: string
): Promise<PerformanceAnalysisResult | string> {
  const filename = getPerformanceCacheFilename(recordingId);
  const jsonURL = `https://corsproxy.io/?url=https://static.replay.io/performance/${filename}`;

  let result;
  try {
    result = await fetch(jsonURL);
  } catch (e) {
    return `Error reading ${jsonURL}`;
  }

  let json;
  try {
    json = await result.json();
  } catch (e) {
    return `Error decoding JSON ${jsonURL}`;
  }

  if (typeof json === 'object' && json.analysisResult?.summaries) {
    processOriginSummaries(json.analysisResult.summaries);
  }
  return json;
}
