export function assert(v: any): asserts v {
  if (!v) {
    throw new Error("Assertion Failed!");
  }
}

export function formatTime(ms: number) {
  return Math.round(ms) + " ms";
}

export function formatDuration(ms: number) {
  return Math.round(ms) + " ms";
}
