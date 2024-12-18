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
      title=""
      scaledScreenShot={commitScreenShot}
      mouseLocation={undefined}
    ></ExpandableScreenShot>
  );

  const otherTime = workerThreadTime + timerTime + unknownTime;

  return (
    <>
      <h3 className="text-4xl font-bold">{title}</h3>
      <div className="flex mt-2">
        <div className="grow">
          <h4 className="text-2xl font-bold">Final Screenshot:</h4>
          <div className="flex grow">
            {commitScreenShotElement}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-2xl font-bold">Timing Information:</h4>
        <div className="pl-2">
          <div>total: {Math.round(elapsed)} ms</div>
          <div>network: {Math.round(networkTime)} ms</div>
          <div>network round trips: {numNetworkRoundTrips}</div>
          <div>scheduling: {Math.round(schedulingTime)} ms</div>
          <div>mainThread: {Math.round(mainThreadTime)} ms</div>
          <div>workerThread: {Math.round(workerThreadTime)} ms</div>
          <div>timer: {Math.round(timerTime)} ms</div>
          <div>unknown: {Math.round(unknownTime)} ms</div>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-2xl font-bold">Network Data by Extension:</h4>
      </div>
    </>
  );
}
