import { OriginSummary } from "../../performance/interfaceTypes";
import { OriginSummaryDisplay } from "./OriginSummaryDisplay";

interface RegressionOriginDisplayProps {
  summary: OriginSummary;
}

export function RegressionOriginDisplay(props: RegressionOriginDisplayProps) {
  const { summary } = props;

  return (
    <div className="m-2 gap-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg">
      <OriginSummaryDisplay summary={summary}></OriginSummaryDisplay>
    </div>
  );
}
