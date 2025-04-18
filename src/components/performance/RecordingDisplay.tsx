import { RecordingLink } from "./RecordingLink";

// Displays overall information about the recording being examined.

interface RecordingDisplayProps {
  recordingId: string;
  recordingURL: string;
}

export function RecordingDisplay({ recordingId, recordingURL }: RecordingDisplayProps) {
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
      ></RecordingLink>
    </span>
  );
}
