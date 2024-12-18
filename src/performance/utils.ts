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

export function getNetworkDataByExtension(requests: { url: string; receivedBytes: number }[]): { [extension: string]: number } {
  const networkDataByExtension: { [extension: string]: number } = {};

  for (const request of requests) {
    try {
      const url = new URL(request.url);
      const pathname = url.pathname;
      const extension = pathname.split('.').pop()?.toLowerCase() || 'no-extension';
      
      networkDataByExtension[extension] = (networkDataByExtension[extension] || 0) + request.receivedBytes;
    } catch (e) {
      continue;
    }
  }

  return networkDataByExtension;
}
