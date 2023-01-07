import { processImage } from "./process";
import {
  type RequestMessage,
  type ResponseMessage,
} from "./process-async-messages";

onmessage = ({
  data: { input, output, settings },
}: MessageEvent<RequestMessage>): void => {
  processImage(input, output, settings);
  postMessage({ input, output, settings } as ResponseMessage, {
    transfer: [
      //
    ],
  });
};
