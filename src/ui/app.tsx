import { type ReactElement, useCallback, useState } from "react";
import { Doc } from "../image/doc";
import { loadImageData } from "../image/load";
import { initialSettings, type Settings } from "../image/settings";
import * as styles from "./app.module.css";
import { Controls } from "./controls";
import { ImageSource } from "./image-source";
import { Preview } from "./preview";

export function App(): ReactElement {
  const [doc, setDoc] = useState(() => Doc.load(new ImageData(1, 1)));

  const handleSelectImage = useCallback(
    (url: string): void => {
      loadImageData(url, { colorSpace: "srgb" })
        .then((imageData) => {
          setDoc(
            Doc.load(imageData).with({
              settings: doc.settings,
              lut: doc.lut,
            }),
          );
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [doc],
  );

  const handleChangeSettings = useCallback(
    (settings: Settings): void => {
      setDoc(doc.with({ settings }));
    },
    [doc],
  );

  const handleChangeLut = useCallback(
    (url: string): void => {
      if (url === "none") {
        setDoc(doc.with({ lut: { url: "none", lut: null } }));
      } else {
        loadImageData(url, { colorSpace: "srgb" })
          .then((imageData) => {
            setDoc(doc.with({ lut: { url, lut: imageData } }));
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    [doc],
  );

  const handleReset = useCallback((): void => {
    setDoc(
      doc.with({
        settings: initialSettings(),
        lut: { url: "none", lut: null },
      }),
    );
  }, [doc]);

  return (
    <div className={styles.app}>
      <div className={styles.editor}>
        <Preview doc={doc} />
      </div>
      <ImageSource onSelectImage={handleSelectImage} />
      <Controls
        doc={doc}
        onChangeSettings={handleChangeSettings}
        onChangeLut={handleChangeLut}
        onReset={handleReset}
      />
    </div>
  );
}
