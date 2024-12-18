import { ExpandableScreenShot } from "./ExpandableScreenShot";
import { DependencyChainOrigin, OriginSummary, PerformanceAnalysisData } from "../../performance/interfaceTypes";
import { assert, formatTime, getNetworkDataByExtension } from "../../performance/utils";
import { ExpandableSection } from "@/pageComponents/team/id/runs/ExpandableSection";

// Displays overall information about performance for behavior triggered
// by an originating event.

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function getOriginTitle(origin: DependencyChainOrigin) {
  switch (origin.kind) {
    case "documentLoad":
      return "Initial Document Load";
    case "dispatchEvent":
      return `User Event: ${origin.eventType}`;
    case "resize":
      return "User Resized Window";
    case "other":
      return "Unknown Origin";
  }
}

interface OriginSummaryProps {
  summary: OriginSummary;
  analysisData: PerformanceAnalysisData;
}

export function OriginSummaryDisplay(props: OriginSummaryProps) {
  const { summary, analysisData } = props;

  const {
    startTime,
    endTime,
    elapsed,
    networkTime,
    schedulingTime,
    mainThreadTime,
    workerThreadTime,
    timerTime,
    unknownTime,
    reactSliceTime,
    numNetworkRoundTrips,
    origin,
    originScreenShot,
    originMouseLocation,
    commitScreenShot,
  } = summary;

  const timeRender =
    (reactSliceTime["SyncRender"] ?? 0) + (reactSliceTime["ConcurrentRender"] ?? 0);
  const timeCommit = reactSliceTime["Commit"] ?? 0;
  const timeFlushPassiveEffects = reactSliceTime["FlushPassiveEffects"] ?? 0;

  const title = getOriginTitle(origin);

  let originScreenShotElement;
  if (originScreenShot) {
    originScreenShotElement = (
      <ExpandableScreenShot
        title="Before"
        scaledScreenShot={originScreenShot}
        mouseLocation={originMouseLocation}
      ></ExpandableScreenShot>
    );
  }

  const commitScreenShotElement = (
    <ExpandableScreenShot
      title="After"
      scaledScreenShot={commitScreenShot}
      mouseLocation={undefined}
    ></ExpandableScreenShot>
  );

  const otherTime = workerThreadTime + timerTime + unknownTime;

  return (
    <>
      <h3 className="text-4xl font-bold">{title}</h3>
      <div className="flex mt-2">
        <div className="shrink-0 min-w-72">
          <h4 className="text-2xl font-bold">Timings</h4>
          <div className="flex flex-col mt-2 mr-2">
            <div className="pl-2">
              <h4 className="text-2xl font-bold">Overall</h4>
              <div>total: {formatTime(elapsed)} ms</div>
              <div>network: {formatTime(networkTime)} ms</div>
              <div>networkRoundTrips: {numNetworkRoundTrips}</div>
              <div>scheduling: {formatTime(schedulingTime)} ms</div>
              <div>mainThread: {formatTime(mainThreadTime)} ms</div>
              <div>workerThread: {formatTime(workerThreadTime)} ms</div>
              <div>timer: {formatTime(timerTime)} ms</div>
              <div>unknown: {formatTime(unknownTime)} ms</div>
            </div>
            <div className="pl-2">
              <ExpandableSection
                grow={false}
                label={<h4 className="text-2xl  font-bold">Timing Details</h4>}
              >
                <div className="flex flex-col">
                  <div className="flex flex-col px-2 py-2">
                    <h4 className="text-xl  font-bold">Main Thread</h4>
                    <div>React Rendering:{formatTime(timeRender)}</div>
                    <div>React Committing:{formatTime(timeCommit)}</div>
                    <div>React Flushing Effects:{formatTime(timeFlushPassiveEffects)}</div>
                  </div>
                </div>
              </ExpandableSection>
            </div>
            <div className="pl-2">
              <ExpandableSection
                grow={false}
                label={<h4 className="text-2xl  font-bold">Network Data by Extension</h4>}
              >
                <div className="flex flex-col">
                  <div className="flex flex-col px-2 py-2">
                    {Object.entries(getNetworkDataByExtension(analysisData.requests)).map(([ext, bytes]) => (
                      <div key={ext}>{ext}: {formatBytes(bytes)}</div>
                    ))}
                  </div>
                </div>
              </ExpandableSection>
            </div>
          </div>
        </div>
        <div className="grow">
          <h4 className="text-2xl  font-bold">Screenshots</h4>
          <div className="flex grow">
            {originScreenShotElement}
            {commitScreenShotElement}
          </div>
        </div>
      </div>
    </>
  );
}
