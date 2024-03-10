import { RecordingDropdown } from "@/app/team/[id]/recordings/RecordingDropdown";
import { RecordingThumbnail } from "@/app/team/[id]/recordings/RecordingThumbnail";
import { Icon } from "@/components/Icon";
import { WorkspaceRecording } from "@/graphql/types";
import { formatDuration, formatRelativeTime } from "@/utils/number";
import { getRecordingTarget } from "@/utils/recording";
import Link from "next/link";

export function Recording({ recording }: { recording: WorkspaceRecording }) {
  const target = getRecordingTarget(recording.buildId);

  const href =
    target === "chromium"
      ? `https://app.replay.io/recording/${recording.uuid}`
      : `https://legacy.replay.io/recording/${recording.uuid}`;

  return (
    <Link
      className="flex flex-row items-center gap-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white"
      href={href}
    >
      <div className="w-16 h-9 bg-slate-900 rounded-sm shrink-0">
        <RecordingThumbnail recordingId={recording.uuid} />
      </div>
      <div className="flex flex-row items-center gap-2 w-full overflow-hidden">
        <div className="flex flex-col grow gap-1 overflow-hidden">
          <div>{recording.title}</div>
          <div className="flex flex-row gap-4 text-sm text-gray-500 whitespace-nowrap">
            <div className="w-16 flex flex-row gap-1 items-center shrink-0">
              <Icon className="w-3 h-3" type="clock" />
              {formatDuration(recording.duration)}
            </div>
            <div className="w-20 flex flex-row gap-1 items-center shrink-0">
              <Icon className="w-3 h-3" type="calendar" />
              {formatRelativeTime(recording.createdAt)} ago
            </div>
            <div className="shrink truncate">{recording.url}</div>
          </div>
        </div>
        <div className="w-20 shrink-0 truncate text-sm">
          {recording.private ? "Private" : "Public"}
        </div>
        <div className="w-36 shrink-0 truncate text-sm">
          {recording.owner?.name ?? ""}
        </div>
        <div className="w-10 shrink-0 flex flex-row items-center gap-1">
          {recording.numComments > 0 && (
            <>
              <div>{recording.numComments}</div>
              <Icon className="w-4 h-4" type="comment" />
            </>
          )}
        </div>
        <div className="w-6 shrink-0">
          <RecordingDropdown recording={recording} />
        </div>
      </div>
    </Link>
  );
}
