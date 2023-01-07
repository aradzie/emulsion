export function loadImageData(
  src: string,
  settings?: ImageDataSettings,
): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(getImageData(image, settings));
    };
    image.onerror = (err) => {
      reject(err);
    };
    image.src = src;
  });
}

export function getImageData(
  image: HTMLImageElement,
  settings?: ImageDataSettings,
): ImageData {
  const width = image.naturalWidth;
  const height = image.naturalHeight;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d")!;
  context.drawImage(image, 0, 0);
  return context.getImageData(0, 0, width, height, settings);
}
