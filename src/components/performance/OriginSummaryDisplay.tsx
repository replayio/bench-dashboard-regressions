import { ExpandableScreenShot } from "./ExpandableScreenShot";
import { DependencyChainOrigin, OriginSummary } from "../../performance/interfaceTypes";
import { assert, formatTime } from "../../performance/utils";
import { ExpandableSection } from "@/pageComponents/team/id/runs/ExpandableSection";

// Displays overall information about performance for behavior triggered
// by an originating event.

function getOriginTitle(origin: DependencyChainOrigin) {
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
}

export function OriginSummaryDisplay(props: OriginSummaryProps) {
  const { summary } = props;

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
          <div className="flex flex-col mt-2 mr-2">
            <div className="pl-2">
              <h4 className="text-2xl font-bold">Timing Information:</h4>
              <div>total: {elapsed} ms</div>
              <div>network: {networkTime} ms</div>
              <div>network round trips: {numNetworkRoundTrips}</div>
              <div>scheduling: {schedulingTime} ms</div>
              <div>mainThread: {mainThreadTime} ms</div>
              <div>workerThread: {workerThreadTime} ms</div>
              <div>timer: {timerTime} ms</div>
              <div>unknown: {unknownTime} ms</div>
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
