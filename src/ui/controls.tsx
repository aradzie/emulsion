import { type ReactElement } from "react";
import { assets } from "../assets/luts";
import { type Doc } from "../image/doc";
import { clampSettings, parameters, type Settings } from "../image/settings";
import * as styles from "./controls.module.css";

export function Controls({
  doc,
  onChangeSettings,
  onChangeLut,
  onReset,
}: {
  readonly doc: Doc;
  readonly onChangeSettings: (settings: Settings) => void;
  readonly onChangeLut: (url: string) => void;
  readonly onReset: () => void;
}): ReactElement {
  return (
    <div className={styles.controls}>
      <div className={styles.parameter}>
        <div className={styles.name}>LUT</div>
        <select
          value={doc.lut.url}
          onChange={(ev) => {
            onChangeLut(ev.target.value);
          }}
        >
          <option value="none">none</option>
          {assets.map((value) => (
            <option key={value.url} value={value.url}>
              {value.name}
            </option>
          ))}
        </select>
      </div>
      {Object.values(parameters).map(({ name, min, max, step }) => (
        <div key={name} className={styles.parameter}>
          <div className={styles.name}>
            {name} ({doc.settings[name]})
          </div>
          <input
            className={styles.input}
            type="range"
            min={min}
            max={max}
            step={step}
            value={doc.settings[name]}
            onInput={(ev) => {
              onChangeSettings(
                clampSettings({
                  ...doc.settings,
                  [name]: (ev.target as HTMLInputElement).valueAsNumber,
                }),
              );
            }}
            onDoubleClick={() => {
              onChangeSettings(
                clampSettings({
                  ...doc.settings,
                  [name]: parameters[name].initial,
                }),
              );
            }}
          />
        </div>
      ))}
      <div
        className={styles.reset}
        onClick={() => {
          onReset();
        }}
      >
        reset
      </div>
    </div>
  );
}
