import { mapColorsFast, processImage } from "./process";
import { initialSettings, type Settings } from "./settings";

export type Lut =
  | {
      readonly url: "none";
      readonly lut: null;
    }
  | {
      readonly url: string;
      readonly lut: ImageData;
    };

export class Doc {
  static load(input: ImageData): Doc {
    const output = new ImageData(
      new Uint8ClampedArray(input.data),
      input.width,
      input.height,
      { colorSpace: input.colorSpace },
    );
    const settings = initialSettings();
    return new Doc({
      input,
      output,
      settings,
      lut: { url: "none", lut: null },
    });
  }

  readonly input: ImageData;
  readonly output: ImageData;
  readonly settings: Settings;
  readonly lut: Lut;

  constructor({
    input,
    output,
    settings,
    lut,
  }: {
    readonly input: ImageData;
    readonly output: ImageData;
    readonly settings: Settings;
    readonly lut: Lut;
  }) {
    this.input = input;
    this.output = output;
    this.settings = settings;
    this.lut = lut;
    output.data.set(input.data);
    processImage(output.data, output.data, settings);
    if (lut.lut != null) {
      mapColorsFast(output.data, output.data, lut.lut.data);
    }
  }

  with({
    settings = this.settings,
    lut = this.lut,
  }: {
    readonly settings?: Settings;
    readonly lut?: Lut;
  }): Doc {
    return new Doc({
      input: this.input,
      output: this.output,
      settings,
      lut,
    });
  }
}
