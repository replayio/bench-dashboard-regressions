import React from "react";
import { getRecordingId } from "../../performance/params";
import { assert } from "../../performance/utils";

// Component for linking to a location in a recording.

interface RecordingLinkProps {
  className: string;
  text: React.ReactNode;
  point: string | undefined;
  time: number | undefined;
  recordingId?: string;
  usePerformanceView?: boolean;
}

export function RecordingLink(props: RecordingLinkProps) {
  const { className, point, time, text, recordingId: propRecordingId, usePerformanceView } = props;
  const urlRecordingId = getRecordingId();
  const recordingId = propRecordingId || urlRecordingId;
  assert(recordingId);
  let url = usePerformanceView 
    ? `https://app.replay.io/recording/${recordingId}/performance`
    : `https://app.replay.io/recording/${recordingId}`;
  if (point && time) {
    url += `?point=${point}&time=${time}`;
  }
  return (
    <a className={className} href={url} target="_blank">
      {text}
    </a>
  );
}
