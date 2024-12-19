import { RecordingLink } from "./RecordingLink";

// Displays overall information about the recording being examined.

interface RecordingDisplayProps {
  recordingId: string;
  recordingURL: string;
  usePerformanceView?: boolean;
}

export function RecordingDisplay({ recordingId, recordingURL, usePerformanceView }: RecordingDisplayProps) {
  // TODO Get the actual recording metadata via GraphQL
  const url = new URL(recordingURL);
  const name = url.host;

  return (
    <span className="RecordingInfo">
      <RecordingLink
        className="DefaultRecordingLink"
        text={`Recording of ${name}`}
        point={undefined}
        time={undefined}
        recordingId={recordingId}
        usePerformanceView={usePerformanceView}
      ></RecordingLink>
    </span>
  );
}
