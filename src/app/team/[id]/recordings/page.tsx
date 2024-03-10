import { LaunchReplayButton } from "@/app/team/[id]/recordings/LaunchReplayButton";
import { LibrarySearch } from "@/app/team/[id]/recordings/LibrarySearch";
import { MountEffects } from "@/app/team/[id]/recordings/MountEffects";
import { Recording } from "@/app/team/[id]/recordings/Recording";
import { ShowMoreRecordingsRow } from "@/app/team/[id]/recordings/ShowMoreRecordingsRow";
import { PAGE_SIZE } from "@/app/team/[id]/recordings/shared";
import { getNonPendingWorkspacesServer } from "@/graphql/queries/getNonPendingWorkspaces";
import { getPersonalRecordingsServer } from "@/graphql/queries/getPersonalRecordings";
import { getWorkspaceRecordingsServer } from "@/graphql/queries/getWorkspaceRecordings";
import { WorkspaceRecording } from "@/graphql/types";
import assert from "assert";

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

  let isTestWorkspace = false;
  if (id !== "me") {
    const workspaces = await getNonPendingWorkspacesServer();
    const workspace = workspaces.find((workspace) => workspace.id === id);
    assert(workspace, `Workspace "${id}" not found`);

    isTestWorkspace = workspace.isTest;
  }

  let recordings: WorkspaceRecording[];
  let totalRecordings: number = 0;
  if (isTestWorkspace) {
    recordings = [];
  } else {
    const limit = searchParams.limit ?? PAGE_SIZE;
    const filter = searchParams.filter ?? "";

    // TODO GraphQL queries should be pulling down only the data we need;
    // else we risk wasting bandwidth (and exceeding NextJS's 2MB cache limit)
    const allRecordings =
      id === "me"
        ? await getPersonalRecordingsServer(filter)
        : await getWorkspaceRecordingsServer(id, filter);

    recordings = allRecordings.slice(0, limit);
    totalRecordings = allRecordings.length;
  }

  return (
    <div className="flex flex-col gap-4 overflow-auto overflow-hidden p-4">
      <div className="flex flex-row items-center gap-4 justify-between">
        <LibrarySearch numRecordings={totalRecordings} />
        <LaunchReplayButton />
      </div>
      <div className="overflow-auto flex flex-col gap-2">
        {isTestWorkspace ? (
          <div className="bg-amber-800 text-amber-200 p-2 rounded">
            <strong>Coming soon</strong>: Test suites
          </div>
        ) : (
          <div className="overflow-auto bg-slate-900 text-white rounded flex flex-col gap-px">
            {recordings.map((recording) => (
              <Recording key={recording.uuid} recording={recording} />
            ))}
            <ShowMoreRecordingsRow maxLimit={totalRecordings} />
          </div>
        )}
      </div>
      <MountEffects workspaceId={id} />
    </div>
  );
}
