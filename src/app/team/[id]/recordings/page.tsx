import { LibrarySearch } from "@/app/team/[id]/recordings/LibrarySearch";
import { Recording } from "@/app/team/[id]/recordings/Recording";
import { ShowMoreRecordingsRow } from "@/app/team/[id]/recordings/ShowMoreRecordingsRow";
import { PAGE_SIZE } from "@/app/team/[id]/recordings/shared";
import { Button } from "@/components/Button";
import { getPersonalRecordingsServer } from "@/graphql/queries/getPersonalRecordings";
import { getWorkspaceRecordingsServer } from "@/graphql/queries/getWorkspaceRecordings";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    filter?: string;
    limit?: number;
  };
}) {
  const id = decodeURIComponent(params.id);

  const limit = searchParams.limit ?? PAGE_SIZE;
  const filter = searchParams.filter ?? "";

  const recordings =
    id === "me"
      ? await getPersonalRecordingsServer(filter)
      : await getWorkspaceRecordingsServer(id, filter);

  const recordingToDisplay = recordings.slice(0, limit);

  return (
    <div className="flex flex-col gap-4 overflow-auto overflow-hidden p-4">
      <div className="flex flex-row items-center gap-4 justify-between">
        <LibrarySearch numRecordings={recordings.length} />
        <Button>Launch Replay</Button>
      </div>
      <div className="overflow-auto flex flex-col gap-2">
        <div className="overflow-auto bg-slate-900 text-white rounded flex flex-col gap-px">
          {recordingToDisplay.map((recording) => (
            <Recording key={recording.uuid} recording={recording} />
          ))}
          <ShowMoreRecordingsRow maxLimit={recordings.length} />
        </div>
      </div>
    </div>
  );
}
