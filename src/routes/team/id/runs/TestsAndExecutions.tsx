import { LoadingProgressBar } from "@/components/LoadingProgressBar";
import { TestSuiteTestStatus } from "@/graphql/types";
import { ExpandableSection } from "@/routes/team/id/runs/ExpandableSection";
import { TestExecutionRow } from "@/routes/team/id/runs/TestExecutionRow";
import { TestRunErrors } from "@/routes/team/id/runs/TestRunErrors";
import { RunsViewContext } from "@/routes/team/id/runs/TestRunsContext";
import { useContext } from "react";

export function TestsAndExecutions({
  selectedTestId,
}: {
  selectedTestId: string;
}) {
  const { tests } = useContext(RunsViewContext);

  const selectedTest = tests?.find((test) => test.id === selectedTestId);

  if (selectedTest == null) {
    return <LoadingProgressBar />;
  }

  return (
    <>
      <div className="bg-slate-800 text-white p-2 rounded">
        <ExpandableSection label="Replays" openByDefault>
          <div className="shrink-0 -mx-2">
            {selectedTest.recordings.map((recording, index) => {
              let status: TestSuiteTestStatus;
              switch (selectedTest.status) {
                case "failed": {
                  status = "failed";
                  break;
                }
                case "flaky": {
                  status =
                    index === selectedTest.recordings.length - 1
                      ? "passed"
                      : "flaky";
                  break;
                }
                case "passed": {
                  status = "passed";
                  break;
                }
              }

              return (
                <TestExecutionRow
                  key={recording.id}
                  recording={recording}
                  status={status}
                />
              );
            })}
          </div>
        </ExpandableSection>
      </div>
      <TestRunErrors test={selectedTest} />
    </>
  );
}
