import { RecordingDropdown } from "@/app/team/[id]/recordings/RecordingDropdown";
import { RecordingThumbnail } from "@/app/team/[id]/recordings/RecordingThumbnail";
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
            <div className="w-16">{formatDuration(recording.duration)}</div>
            <div className="w-16">
              {formatRelativeTime(recording.createdAt)} ago
            </div>
            <div className="shrink truncate">{recording.url}</div>
          </div>
        </div>
        <div className="w-20 shrink-0 truncate">
          {recording.private ? "Private" : "Public"}
        </div>
        <div className="w-36 shrink-0 truncate">
          {recording.owner?.name ?? ""}
        </div>
        <div className="w-10 shrink-0 flex flex-row items-center gap-1">
          {recording.numComments > 0 && (
            <>
              <div>{recording.numComments}</div>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 2.57152C2.88634 2.57152 2.77733 2.61668 2.69695 2.69705C2.61658 2.77743 2.57143 2.88644 2.57143 3.00011V15.8577C2.57143 16.0943 2.76343 16.2863 3 16.2863H6.42857C6.76956 16.2863 7.09659 16.4218 7.33771 16.6629C7.57883 16.904 7.71429 17.2311 7.71429 17.5721V21.3265L12.3771 16.6635C12.618 16.4223 12.9448 16.2866 13.2857 16.2863H21C21.1137 16.2863 21.2227 16.2412 21.303 16.1608C21.3834 16.0804 21.4286 15.9714 21.4286 15.8577V3.00011C21.4286 2.88644 21.3834 2.77743 21.303 2.69705C21.2227 2.61668 21.1137 2.57152 21 2.57152H3ZM0 3.00011C0 1.34405 1.344 0 3 0H21C22.656 0 24 1.34405 24 3.00011V15.8577C24 16.6534 23.6839 17.4165 23.1213 17.9791C22.5587 18.5417 21.7957 18.8578 21 18.8578H13.8171L9.40629 23.2688C9.05698 23.618 8.61201 23.8557 8.12761 23.9521C7.64322 24.0484 7.14115 23.9989 6.68486 23.8099C6.22857 23.6209 5.83854 23.3009 5.56408 22.8903C5.28961 22.4797 5.14303 21.997 5.14286 21.5031V18.8578H3C2.20435 18.8578 1.44129 18.5417 0.87868 17.9791C0.31607 17.4165 0 16.6534 0 15.8577V3.00011Z"
                  fill="#6C7280"
                />
              </svg>
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
