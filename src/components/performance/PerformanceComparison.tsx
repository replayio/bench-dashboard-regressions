import { compareWithMainBranch } from "@/performance/workspaceData";
import { formatTime as formatDuration } from "@/performance/utils";

interface ComparisonProps {
  label: string;
  value: number;
  mainBranchValues: number[];
  unit?: string;
  formatFn?: (value: number) => string;
}

export function ComparisonValue({ label, value, mainBranchValues, unit = "", formatFn = String }: ComparisonProps) {
  const { isWorse, deviation } = compareWithMainBranch(value, mainBranchValues);
  
  return (
    <div className="flex gap-2 items-baseline">
      <span className="font-medium">{label}:</span>
      <span className={isWorse ? "text-red-500" : ""}>
        {formatFn(value)}{unit}
        {isWorse && deviation !== undefined && (
          <span className="ml-2 text-sm">
            (+{formatFn(deviation)}{unit} worse than main)
          </span>
        )}
      </span>
    </div>
  );
}

interface NetworkDataProps {
  data: Record<string, number>;
  mainBranchData: Record<string, number>[];
}

export function NetworkDataComparison({ data, mainBranchData }: NetworkDataProps) {
  const allExtensions = new Set<string>();
  [data, ...mainBranchData].forEach(d => {
    Object.keys(d).forEach(ext => allExtensions.add(ext));
  });

  return (
    <div className="mt-2">
      <h4 className="font-semibold">Network Data by Extension:</h4>
      <div className="ml-4">
        {Array.from(allExtensions)
          .map(ext => {
            const value = data[ext] || 0;
            const mainValues = mainBranchData.map(d => d[ext] || 0);
            return (
              <ComparisonValue
                key={ext}
                label={ext}
                value={value}
                mainBranchValues={mainValues}
                unit=" KB"
                formatFn={bytes => (bytes / 1024).toFixed(1)}
              />
            );
          })}
      </div>
    </div>
  );
}

interface TimingProps {
  timing: {
    total: number;
    [key: string]: number;
  };
  mainBranchTimings: {
    total: number;
    [key: string]: number;
  }[];
}

export function TimingComparison({ timing, mainBranchTimings }: TimingProps) {
  const allMetrics = new Set<string>();
  [timing, ...mainBranchTimings].forEach(t => {
    Object.keys(t).forEach(metric => allMetrics.add(metric));
  });

  const timingMetrics = Array.from(allMetrics).filter(metric => metric !== 'networkRoundTrips');
  const networkRoundTrips = timing.networkRoundTrips || 0;
  const mainBranchNetworkRoundTrips = mainBranchTimings.map(t => t.networkRoundTrips || 0);

  return (
    <div className="mt-2">
      <h4 className="font-semibold">Timing Information:</h4>
      <div className="ml-4">
        {timingMetrics.map(metric => {
          const value = timing[metric] || 0;
          const mainValues = mainBranchTimings.map(t => t[metric] || 0);
          return (
            <ComparisonValue
              key={metric}
              label={metric}
              value={value}
              mainBranchValues={mainValues}
              unit=" ms"
              formatFn={formatDuration}
            />
          );
        })}
      </div>
      <ComparisonValue
        label="Network Round Trips"
        value={networkRoundTrips}
        mainBranchValues={mainBranchNetworkRoundTrips}
        unit=""
        formatFn={String}
      />
    </div>
  );
}
