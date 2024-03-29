import FormButton from '@/components/Form/FormButton';
import useSelectImage from '@/utils/hooks/useSelectImage';
import { useForm } from 'react-hook-form';
import {
  ButtonWrapper,
  Form,
  PageContainer,
  PetNameHighlight,
  QuestionText,
  SkipButton,
} from './index.style';

import AddPhotoImage from '../../assets/icon/btn_add_photo.png';
import { StepPageProps } from './type';

export default function Step2({ goNextStep, enrollPetData, setEnrollData }: StepPageProps) {
  const { imageFile: petImage, handleChangeImage } = useSelectImage({
    initImageFile: enrollPetData.petImage,
  });
  const { handleSubmit } = useForm();
  const isButtonDisabled = !petImage;

  const savePhoto = () => {
    setEnrollData('petImage', petImage);
    goNextStep();
  };

  return (
    <PageContainer>
      <Form onSubmit={handleSubmit(savePhoto)}>
        <div className="flex flex-col gap-20">
          <div className="space-y-[10px]">
            <h3 className="text-h2 leading-[35px]">
              <PetNameHighlight>{enrollPetData.name}</PetNameHighlight>!
            </h3>
            <div>
              <QuestionText>정말 사랑스러운 이름이네요! </QuestionText>
              <QuestionText>혹시 사진이 있나요?</QuestionText>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="relative felx items-center justify-center">
              <label
                className="absolute opacity-4 bottom-1 right-1 rounded-full"
                htmlFor="pet-thumbnail"
              >
                <img src={AddPhotoImage} alt="" />
              </label>
              <img
                alt=""
                src={petImage}
                className="bg-secondary-brightest h-[200px] w-[200px] rounded-full overflow-hidden"
              />
            </div>
            <input
              type="file"
              id="pet-thumbnail"
              accept="image/jpg, image/png, image/jpeg"
              onChange={handleChangeImage}
            />
          </div>
        </div>
        <ButtonWrapper>
          <SkipButton type="button" onClick={goNextStep}>
            나중에 등록할래요
          </SkipButton>
          <FormButton name="다음으로" disabled={isButtonDisabled} />
        </ButtonWrapper>
      </Form>
    </PageContainer>
  );
}
