import { assert } from "./utils";

export interface WorkspaceRecordingData {
  recordingId: string;
  metadata: {
    workspaceId: string;
    testTitle: string;
    repo: string;
    branch: string;
    commit: string;
  };
  timestamp: string;
  recordingPerformanceFile: string;
}

export interface WorkspaceData {
  workspaceId: string;
  recordings: WorkspaceRecordingData[];
}

export async function fetchWorkspaceData(workspaceId: string): Promise<WorkspaceData> {
  const url = `https://corsproxy.io/?url=https://static.replay.io/performance/workspaces/${workspaceId}/workspace-performance-v1-v3-v5-v12.json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch workspace data: ${response.statusText}`);
  }
  const recordings = await response.json();
  return { workspaceId, recordings };
}

export function getMainBranchRecordings(
  workspaceData: WorkspaceData,
  beforeTimestamp: string,
  count: number = 5
): WorkspaceRecordingData[] {
  return workspaceData.recordings
    .filter(r => r.metadata.branch === "main" && r.timestamp < beforeTimestamp)
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, count);
}

export function getRecordingData(workspaceData: WorkspaceData, recordingId: string): WorkspaceRecordingData | undefined {
  return workspaceData.recordings.find(r => r.recordingId === recordingId);
}

export function compareWithMainBranch(value: number, mainBranchValues: number[]): {
  isWorse: boolean;
  deviation?: number;
} {
  if (mainBranchValues.length === 0) return { isWorse: false };
  const maxValue = Math.max(...mainBranchValues);
  const isWorse = value > maxValue;
  return {
    isWorse,
    deviation: isWorse ? value - maxValue : undefined,
  };
}
