import { type ReactElement } from "react";
import { assets } from "../assets/images";
import * as styles from "./image-source.module.css";

export function ImageSource({
  onSelectImage,
}: {
  readonly onSelectImage: (url: string) => void;
}): ReactElement {
  return (
    <div className={styles.imageSource}>
      {assets.map(({ name, url }) => (
        <img
          key={url}
          className={styles.item}
          src={url}
          alt="Example image."
          title={name}
          onClick={() => {
            onSelectImage(url);
          }}
        />
      ))}
    </div>
  );
}
