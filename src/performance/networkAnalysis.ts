import { DependencyChainStep, OriginSummary } from "./interfaceTypes";

function getFileExtension(url: string): string {
  try {
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname;
    const lastDotIndex = pathname.lastIndexOf('.');
    if (lastDotIndex === -1 || lastDotIndex === pathname.length - 1) {
      return 'unknown';
    }
    return pathname.slice(lastDotIndex + 1).toLowerCase();
  } catch {
    return 'unknown';
  }
}

export function computeNetworkDataByExtension(steps: DependencyChainStep[]): { [extension: string]: number } {
  const networkDataByExtension: { [extension: string]: number } = {};
  let currentRequestUrl: string | null = null;
  let currentRequestBytes = 0;

  for (const step of steps) {
    if ('code' in step) {
      switch (step.code) {
        case 'DocumentInitiateNetworkRequest':
        case 'ScriptInitiateNetworkRequest':
          if (currentRequestUrl && currentRequestBytes > 0) {
            const ext = getFileExtension(currentRequestUrl);
            networkDataByExtension[ext] = (networkDataByExtension[ext] || 0) + currentRequestBytes;
          }
          currentRequestUrl = step.url;
          currentRequestBytes = 0;
          break;

        case 'NetworkReceiveData':
          if (currentRequestUrl) {
            currentRequestBytes += step.numBytes;
          }
          break;

        case 'NetworkReceiveResource':
          if (currentRequestUrl && currentRequestBytes > 0) {
            const ext = getFileExtension(currentRequestUrl);
            networkDataByExtension[ext] = (networkDataByExtension[ext] || 0) + currentRequestBytes;
          }
          currentRequestUrl = null;
          currentRequestBytes = 0;
          break;
      }
    }
  }

  if (currentRequestUrl && currentRequestBytes > 0) {
    const ext = getFileExtension(currentRequestUrl);
    networkDataByExtension[ext] = (networkDataByExtension[ext] || 0) + currentRequestBytes;
  }

  return networkDataByExtension;
}

export function processOriginSummaries(summaries: OriginSummary[]): void {
  for (const summary of summaries) {
    summary.networkDataByExtension = computeNetworkDataByExtension(summary.dependencySteps);
  }
}
