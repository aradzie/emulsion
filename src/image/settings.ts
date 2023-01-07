export type SettingsKeys =
  | "temperature"
  | "brightness"
  | "contrast"
  | "vibrance"
  | "vibrance_bias"
  | "saturation";

export type Settings = Record<SettingsKeys, number>;

export type SettingsParameter = {
  readonly name: SettingsKeys;
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly initial: number;
};

export const parameters: Record<SettingsKeys, SettingsParameter> = {
  temperature: {
    name: "temperature",
    min: 3000,
    max: 25000,
    step: 1,
    initial: 6500,
  },
  brightness: {
    name: "brightness",
    min: 0,
    max: 2,
    step: 0.01,
    initial: 1,
  },
  contrast: {
    name: "contrast",
    min: -1,
    max: +1,
    step: 0.01,
    initial: 0,
  },
  vibrance: {
    name: "vibrance",
    min: -1,
    max: +1,
    step: 0.01,
    initial: 0,
  },
  vibrance_bias: {
    name: "vibrance_bias",
    min: 0,
    max: 1,
    step: 0.01,
    initial: 1,
  },
  saturation: {
    name: "saturation",
    min: -1,
    max: +1,
    step: 0.01,
    initial: 0,
  },
};

export function initialSettings(): Settings {
  return Object.fromEntries(
    Object.values(parameters).map(({ name, initial }) => [name, initial]),
  ) as Settings;
}

export function clampSettings(settings: Settings): Settings {
  for (const { name, min, max } of Object.values(parameters)) {
    settings[name] = Math.min(Math.max(settings[name], min), max);
  }
  return settings;
}
