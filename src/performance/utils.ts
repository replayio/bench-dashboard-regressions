export function assert(v: any): asserts v {
  if (!v) {
    throw new Error("Assertion Failed!");
  }
}

export function formatTime(ms: number): string {
  return Math.round(ms).toString();
}

function formatDurationImpl(ms: number): string {
  return Math.round(ms).toString();
}

export const formatDuration = formatDurationImpl;
