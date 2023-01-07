import { type Settings } from "./settings";

export type RequestMessage = {
  readonly input: Uint8ClampedArray;
  readonly output: Uint8ClampedArray;
  readonly settings: Settings;
};

export type ResponseMessage = {
  readonly input: Uint8ClampedArray;
  readonly output: Uint8ClampedArray;
  readonly settings: Settings;
};
