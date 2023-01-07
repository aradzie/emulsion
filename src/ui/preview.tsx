import {
  type MouseEvent,
  type ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { type Doc } from "../image/doc";
import * as styles from "./preview.module.css";

export function Preview({ doc }: { readonly doc: Doc }): ReactElement {
  const ref = useRef<HTMLCanvasElement>(null);

  const [coord, setCoord] = useState([0, 0]);

  const { width, height } = doc.input;

  useEffect(() => {
    const [splitX, splitY] = coord;
    const canvas = ref.current!;
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d")!;
    context.putImageData(
      doc.input,
      /* dx= */ 0,
      /* dy= */ 0,
      /* sx= */ 0,
      /* sy= */ 0,
      /* sw= */ splitX,
      /* sh= */ height,
    );
    context.putImageData(
      doc.output,
      /* dx= */ 0,
      /* dy= */ 0,
      /* sx= */ splitX,
      /* sy= */ 0,
      /* sw= */ width - splitX,
      /* sh= */ height,
    );
  }, [doc, width, height, coord]);

  const handleMouseMove = (event: MouseEvent): void => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);
    setCoord([x, y]);
  };

  return (
    <canvas
      ref={ref}
      className={styles.preview}
      style={{ width, height }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {}}
      onMouseLeave={() => {
        setCoord([0, 0]);
      }}
    ></canvas>
  );
}
