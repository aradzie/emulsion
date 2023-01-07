import {
  type RequestMessage,
  type ResponseMessage,
} from "./process-async-messages";
import { type Settings } from "./settings";

const worker = new Worker(
  /* webpackChunkName: "process-async-worker" */ new URL(
    "./process-async-worker",
    import.meta.url,
  ),
  {
    name: "process-async",
    type: "module",
  },
);

export function processImageAsync(
  input: Uint8ClampedArray,
  output: Uint8ClampedArray,
  settings: Settings,
): Promise<void> {
  return new Promise((resolve, reject) => {
    worker.onmessage = (ev: MessageEvent<ResponseMessage>): void => {
      resolve();
    };
    worker.onerror = (ev: ErrorEvent): void => {
      reject(ev);
    };
    worker.postMessage({ input, output, settings } as RequestMessage, {
      transfer: [
        //
      ],
    });
  });
}
