import { ChangeEvent, useState } from 'react';

export default function useSelectImage({
  initPreviewUrl,
  initImageFile,
}: {
  initPreviewUrl?: string;
  initImageFile?: string;
}) {
  const [previewUrl, setPreviewUrl] = useState(initPreviewUrl);
  const [imageFile, setImageFile] = useState<string | undefined>(initImageFile);

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) return;

    const image = files[0];
    if (!image.type.includes('image/')) {
      alert('사진을 선택해주세요.');
      return;
    }
    setImageFile(URL.createObjectURL(image));

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (!e.target?.result) return;
      if (typeof e.target.result !== 'string') return;

      setPreviewUrl(e.target.result);
    };
  };

  return {
    previewUrl,
    imageFile,
    handleChangeImage,
    setPreviewUrl,
  };
}
