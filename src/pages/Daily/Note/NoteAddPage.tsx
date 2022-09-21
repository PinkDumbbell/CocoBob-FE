import React, { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import FormInput, { Label } from '@/components/Form/FormInput';
import { ReactComponent as PlusIcon } from '@/assets/icon/plus_icon.svg';
import { useConfirm, useToastMessage } from '@/utils/hooks';

import Button from '@/components/Button';
import {
  AddImageButton,
  BottomSection,
  ImageContainerColumn,
  ImagesContainer,
  ImageWrapper,
  MainSection,
  PageContainer,
  TextArea,
  TitleSection,
} from './index.style';

type LocationStateType = {
  date?: Date;
};
type NoteFormType = {
  title: string;
  contents: string;
};
type ImageType = {
  id: number;
  file: File;
  preview: string;
};
export default function NoteAddPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationStateType;
  const openToast = useToastMessage();
  const [confirm] = useConfirm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteFormType>();

  const imageEl = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<ImageType[]>([]);
  const canAddImage = images.length < 4;

  const saveNote = (formInputs: NoteFormType) => {
    openToast(formInputs.title, 'success');
  };

  const goBackGuard = async () => {
    const goBack = await confirm({
      title: '',
      contents: <p className="text-center">페이지를 나가면 작성중인 글이 삭제됩니다.</p>,
    });
    if (!goBack) return;
    navigate(-1);
  };

  const getImageObject = (file: File, preview: string) => ({
    id: Date.now(),
    file,
    preview,
  });

  const hanldeAddImage = () => {
    if (!imageEl.current) return;
    imageEl.current.click();
  };
  const removeImage = (imageId: number) => {
    setImages((prevImages) => {
      const newImages = Array.from(prevImages);
      const toRemoveIndex = newImages.findIndex((image) => image.id === imageId);
      if (toRemoveIndex === -1) {
        return newImages;
      }
      newImages.splice(toRemoveIndex, 1);
      return newImages;
    });
  };
  const resetInputEl = (el: HTMLInputElement) => {
    el.value = '';
    if (!/safari/i.test(navigator.userAgent)) {
      el.type = '';
      el.type = 'file';
    }
  };

  const addNewImage = (image: File, previewUrl: string) => {
    const newImage: ImageType = getImageObject(image, previewUrl);
    setImages((prev) => [...prev, newImage]);
  };

  const handleSelectImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    // eslint-disable-next-line no-unused-vars
    onImageLoad: (image: File, previewUrl: string) => void,
  ) => {
    const {
      target: { files },
    } = e;
    if (!files) return;
    const image = files[0];

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (!event.target?.result) return;
      if (typeof event.target.result !== 'string') return;
      onImageLoad(image, event.target.result);
    };
  };

  useEffect(() => {
    if (locationState?.date) return;
    navigate('/404', { replace: true });
  }, [locationState]);

  useEffect(() => {
    if (!imageEl.current) return;
    resetInputEl(imageEl.current);
  }, [images]);

  return (
    <Layout
      canGoBack
      onClickGoBack={goBackGuard}
      header
      title={dayjs(locationState.date).format('MM월 DD일')}
    >
      <PageContainer>
        <form className="flex flex-col h-full w-full" onSubmit={handleSubmit(saveNote)}>
          <TitleSection>
            <FormInput
              label="제목 "
              name="title"
              placeholder="제목을 입력하세요"
              errorMessage={errors.title?.message}
              isError={!!errors.title?.message}
              rules={register('title', { required: '제목을 입력하세요' })}
            />
          </TitleSection>
          <MainSection>
            <Label isError={!!errors.contents?.message} htmlFor="contents">
              내용
            </Label>
            <TextArea
              id="contents"
              className={errors.contents ? 'border-red-500' : ''}
              {...register('contents', {
                required: '글 내용을 입력하세요',
              })}
              placeholder="글 내용을 입력하세요"
            ></TextArea>
            {errors.contents?.message && (
              <p aria-errormessage={errors.contents?.message} className="text-red-500 text-sm pt-1">
                {errors.contents?.message}
              </p>
            )}
          </MainSection>
          <BottomSection>
            <ImagesContainer>
              {images.length > 0 &&
                images.map((image) => (
                  <ImageContainerColumn key={image.id}>
                    <ImageWrapper onClick={() => removeImage(image.id)}>
                      <img src={image.preview} alt="" className="w-full" />
                    </ImageWrapper>
                  </ImageContainerColumn>
                ))}
              {canAddImage && (
                <ImageContainerColumn>
                  <input
                    type="file"
                    accept="image/*"
                    ref={imageEl}
                    style={{ display: 'none' }}
                    onChange={(e) => handleSelectImage(e, addNewImage)}
                  />
                  <AddImageButton type="button" onClick={hanldeAddImage}>
                    <PlusIcon className="w-9" />
                  </AddImageButton>
                </ImageContainerColumn>
              )}
            </ImagesContainer>
          </BottomSection>
          <Button type="submit" width="full" label="저장하기" />
        </form>
      </PageContainer>
    </Layout>
  );
}
