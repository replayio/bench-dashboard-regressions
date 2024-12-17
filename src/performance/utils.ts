export function assert(v: any): asserts v {
  if (!v) {
    throw new Error("Assertion Failed!");
  }
}

export function formatTime(ms: number) {
  return Math.round(ms) + " ms";
}

function formatDurationImpl(ms: number) {
  return Math.round(ms) + " ms";
}

export const formatDuration = formatDurationImpl;
