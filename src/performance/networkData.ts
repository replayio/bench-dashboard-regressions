import { NetworkRequest } from "./interfaceTypes";

export function computeNetworkDataByExtension(requests: NetworkRequest[]) {
  const networkDataByExtension: { [ext: string]: number } = {};

  for (const request of requests) {
    try {
      const url = new URL(request.url);
      const pathname = url.pathname;
      let ext = pathname.substring(pathname.lastIndexOf('.') + 1).toLowerCase() || 'no-extension';
      
      if (ext.includes('/') || ext.length > 6 || ext === 'map') {
        ext = 'unknown';
      }
      
      if (!networkDataByExtension[ext]) {
        networkDataByExtension[ext] = 0;
      }
      networkDataByExtension[ext] += request.receivedBytes;
    } catch (e) {
      continue;
    }
  }

  return networkDataByExtension;
}
