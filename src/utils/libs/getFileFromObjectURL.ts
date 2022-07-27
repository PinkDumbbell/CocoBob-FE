export async function getFileFromObjectURL(objectURL: string) {
  const fileName = objectURL.slice(objectURL.lastIndexOf('/') + 1);

  const file = await fetch(objectURL)
    .then((r) => r.blob())
    .then((blobFile) => new File([blobFile], fileName, { type: 'image/png' }));
  return file;
}
