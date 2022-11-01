import React, { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import FormInput, { Label } from '@/components/Form/FormInput';
import { ReactComponent as PlusIcon } from '@/assets/icon/plus_icon.svg';
import { useConfirm, useToastMessage } from '@/utils/hooks';

import Button from '@/components/Button';
import { NoteType, useCreateNoteRecordMutation, useEditNoteMutation } from '@/store/api/dailyApi';
import { useAppSelector } from '@/store/config';
import { getCurrentPet } from '@/store/slices/userSlice';
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
  editState?: {
    noteId: number;
    noteData: NoteType;
  };
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
  const { editState } = locationState;
  const isEditMode = !!editState;

  const currentPetId = useAppSelector(getCurrentPet);
  const currentDate = dayjs(locationState.date).format('YYYY-MM-DD');
  const openToast = useToastMessage();
  const [confirm] = useConfirm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<NoteFormType>();

  const imageEl = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<ImageType[]>([]);
  const [currentImages, setCurrentImages] = useState<{ imageId: number; path: string }[]>([]);
  const [removeImageIds, setRemoveImageIds] = useState<number[]>([]);
  const canAddImage = images.length < 4;

  const [createNoteMutation, { isLoading: isCreateLoading, isSuccess }] =
    useCreateNoteRecordMutation();
  const [editNoteMutation, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess }] =
    useEditNoteMutation();

  const isLoading = isCreateLoading || isUpdateLoading;

  const createNote = (formInputs: NoteFormType) => {
    if (!currentPetId) {
      return;
    }
    const noteData = {
      title: formInputs.title,
      note: formInputs.contents,
      images: images.map((image) => image.file),
    };
    createNoteMutation({ petId: currentPetId, date: currentDate, noteData, sessionId: Date.now() });
  };
  const editNote = (formInputs: NoteFormType) => {
    if (!editState?.noteId) {
      return;
    }
    const noteData = {
      noteId: editState.noteId,
      title: formInputs.title,
      note: formInputs.contents,
      newImages: images.map((image) => image.file),
      imageIdsToDelete: removeImageIds,
    };
    editNoteMutation(noteData);
  };

  const saveNote = (formInputs: NoteFormType) => {
    if (!currentPetId) {
      openToast('반려동물 정보가 없습니다. 다시 시도해주세요.');
      return;
    }

    if (isEditMode) {
      editNote(formInputs);
    } else {
      createNote(formInputs);
    }
  };

  const goBackGuard = async () => {
    const message = isEditMode
      ? '수정을 취소하시겠습니까?'
      : '페이지를 나가면 작성중인 글이 삭제됩니다.';
    const goBack = await confirm({
      contents: <p className="py-10">{message}</p>,
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

  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    navigate(`/daily?date=${currentDate}`);
  }, [isSuccess]);

  useEffect(() => {
    if (!editState) {
      return;
    }
    const { title, note, images: existImages } = editState.noteData;
    setValue('title', title);
    setValue('contents', note);

    setCurrentImages(existImages);
  }, [editState]);

  useEffect(() => {
    if (!isUpdateSuccess || !editState?.noteId) {
      return;
    }

    navigate(-1);
  }, [isUpdateSuccess]);

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
              {currentImages.length > 0 &&
                currentImages.map(({ imageId, path }) => (
                  <ImageContainerColumn key={imageId}>
                    <ImageWrapper
                      onClick={() => {
                        setRemoveImageIds((prevIds) => [...prevIds, imageId]);
                        setCurrentImages((prevImages) => {
                          const newImages = prevImages.filter((image) => image.imageId !== imageId);
                          return newImages;
                        });
                      }}
                    >
                      <img src={path} alt="" className="w-full" />
                    </ImageWrapper>
                  </ImageContainerColumn>
                ))}
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
          <Button
            type="submit"
            width="full"
            label={isLoading ? '저장중...' : isEditMode ? '수정하기' : '저장하기'}
            disabled={isLoading}
          />
        </form>
      </PageContainer>
    </Layout>
  );
}
