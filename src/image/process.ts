import { type Settings } from "./settings";

const lr = 0.2126;
const lg = 0.7152;
const lb = 0.0722;

export function processImage(
  input: Uint8ClampedArray,
  output: Uint8ClampedArray,
  {
    temperature,
    brightness,
    contrast,
    vibrance,
    vibrance_bias,
    saturation,
  }: Settings,
) {
  const [tr, tg, tb] = temperatureToRgb(temperature);

  const { length } = input;

  for (let i = 0; i < length; i += 4) {
    let r = input[i] / 255;
    let g = input[i + 1] / 255;
    let b = input[i + 2] / 255;

    // Adjust temperature.

    r *= tr;
    g *= tg;
    b *= tb;

    // Adjust brightness.

    r *= brightness;
    g *= brightness;
    b *= brightness;

    // Adjust contrast.

    r += (r - 0.5) * contrast;
    g += (g - 0.5) * contrast;
    b += (b - 0.5) * contrast;

    // Adjust vibrance and saturation.

    const l = r * lr + g * lg + b * lb;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const lum = (max + min) / 2;
    const sat =
      lum < 0.5
        ? (max - min) / (1e-5 + max + min)
        : (max - min) / (1e-5 + Math.max(0, 2 - max - min));
    const weight =
      (1 - 1.5 * sat + (1 + Math.abs(lum - 0.5) * 2) * (1 - vibrance_bias)) /
      (1 + (1 - vibrance_bias));
    const s = vibrance * clamp(weight, 0, 1) + saturation;

    r += (r - l) * s;
    g += (g - l) * s;
    b += (b - l) * s;

    // Output.

    output[i] = r * 255;
    output[i + 1] = g * 255;
    output[i + 2] = b * 255;
    output[i + 3] = input[i + 3];
  }
}

export function mapColorsFast(
  input: Uint8ClampedArray,
  output: Uint8ClampedArray,
  clut: Uint8ClampedArray,
): void {
  const size = Math.round(Math.pow(clut.length / 4, 1 / 3));
  const scale = (size - 1) / 255;

  const { length } = input;

  for (let i = 0; i < length; i += 4) {
    const r = Math.round(input[i] * scale);
    const g = Math.round(input[i + 1] * scale);
    const b = Math.round(input[i + 2] * scale);
    const ci = (r + g * size + b * size * size) * 4;

    output[i] = clut[ci];
    output[i + 1] = clut[ci + 1];
    output[i + 2] = clut[ci + 2];
    output[i + 3] = input[i + 3];
  }
}

export function mapColorsAccurate(
  input: Uint8ClampedArray,
  output: Uint8ClampedArray,
  clut: Uint8ClampedArray,
): void {
  throw new TypeError(); // Not implemented.
}

/**
 * @see http://www.tannerhelland.com/4435/convert-temperature-rgb-algorithm-code/
 */
function temperatureToRgb(temperature: number): [number, number, number] {
  temperature /= 100;
  let r: number;
  let g: number;
  let b: number;
  if (temperature <= 66) {
    r = 255;
    g = 99.4708025861 * Math.log(temperature) - 161.1195681661;
    if (temperature <= 19) {
      b = 0;
    } else {
      b = 138.5177312231 * Math.log(temperature - 10) - 305.0447927307;
    }
  } else {
    r = 329.698727446 * Math.pow(temperature - 60, -0.1332047592);
    g = 288.1221695283 * Math.pow(temperature - 60, -0.0755148492);
    b = 255;
  }
  r = clamp(r, 0, 255);
  g = clamp(g, 0, 255);
  b = clamp(b, 0, 255);
  const l = r * lr + g * lg + b * lb;
  return [l / r, l / g, l / b];
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(Math.min(value, max), min);
}
