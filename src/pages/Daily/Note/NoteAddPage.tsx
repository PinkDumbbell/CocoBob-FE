import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import FormInput, { Label } from '@/components/Form/FormInput';
import { ReactComponent as CheckIcon } from '@/assets/icon/check_icon.svg';
import { ReactComponent as PlusIcon } from '@/assets/icon/plus_icon.svg';
import { useConfirm, useToastMessage } from '@/utils/hooks';
import { concatClasses } from '@/utils/libs/concatClasses';

function SubmitButton({ onSubmit }: { onSubmit: () => void }) {
  return (
    <button type="button" onClick={onSubmit} className="aspect-square">
      <CheckIcon />
    </button>
  );
}

type LocationStateType = {
  date?: Date;
};
type NoteFormType = {
  title: string;
  contents: string;
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

  const addNewImage = () => {
    openToast('준비중입니다.', 'success');
  };
  useEffect(() => {
    if (locationState?.date) return;
    navigate('/404', { replace: true });
  }, [locationState]);

  return (
    <Layout
      canGoBack
      onClickGoBack={goBackGuard}
      header
      title={dayjs(locationState.date).format('MM월 DD일')}
      customRightChild={<SubmitButton onSubmit={handleSubmit(saveNote)} />}
    >
      <div className="w-full h-full p-4 flex flex-col gap-4">
        <div className="w-full">
          <FormInput
            label="제목 "
            name="title"
            placeholder="제목을 입력하세요"
            errorMessage={errors.title?.message}
            isError={!!errors.title?.message}
            rules={register('title', { required: '제목을 입력하세요' })}
          />
        </div>
        <div className="flex-1 w-full h-full flex flex-col gap-1">
          <Label isError={!!errors.contents?.message} htmlFor="contents">
            내용
          </Label>
          <textarea
            id="contents"
            {...register('contents', {
              required: '글 내용을 입력하세요',
            })}
            className={concatClasses(
              'p-2 rounded-[10px] border border-gray-200 w-full h-full resize-none',
              errors.contents ? 'border-red-500' : '',
            )}
            placeholder="글 내용을 입력하세요"
          ></textarea>
          {errors.contents?.message && (
            <p aria-errormessage={errors.contents?.message} className="text-red-500 text-sm pt-1">
              {errors.contents?.message}
            </p>
          )}
        </div>
        <div className="py-2 h-28 w-full">
          <button
            type="button"
            onClick={addNewImage}
            className="border border-dashed border-gray-500 h-full aspect-square rounded-[10px] flex items-center justify-center"
          >
            <PlusIcon className="w-9" />
          </button>
        </div>
      </div>
    </Layout>
  );
}
