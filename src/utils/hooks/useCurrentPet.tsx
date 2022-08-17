/* eslint-disable no-extra-boolean-cast */
import { useGetPetsDetailQuery } from '@/store/api/petApi';
import { useAppSelector } from '@/store/config';
import { getCurrentPet } from '@/store/slices/userSlice';
import { useEffect } from 'react';

export default function useCurrentPet() {
  const currentPetId = useAppSelector(getCurrentPet);
  const query = useGetPetsDetailQuery(currentPetId as number, {
    skip: !!!currentPetId,
  });

  useEffect(() => {
    if (!currentPetId) return;
    query.refetch();
  }, [currentPetId]);

  return query;
}
