import { useMutation, useQueryClient } from '@tanstack/react-query';
import solutionService from '../services/solutionService';
import { paths } from '../constant';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const actionLikeFn = (solutionId: string) => {
  return solutionService.like({ solutionId });
};

const actionDislikeFn = (solutionId: string) => {
  return solutionService.dislike({ solutionId });
};

const actionUnInteraction = (solutionId: string) => {
  return solutionService.unInteraction({ solutionId });
};

const useActionsOfSolution = (solutionId: string) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const mutationLike = useMutation({
    mutationFn: () => actionLikeFn(solutionId),
    onSuccess: () => {
      toast.success(t('ToastMessage.Solution.Like.Success'));
      queryClient.invalidateQueries({
        queryKey: [paths.QUERY_KEY.solutionDetails, solutionId],
      });
    },
    onError: () => {
      toast.error(t('ToastMessage.Solution.Like.Error'));
    },
  });

  const mutationDislike = useMutation({
    mutationFn: () => actionDislikeFn(solutionId),
    onSuccess: () => {
      toast.success(t('ToastMessage.Solution.Dislike.Success'));
      queryClient.invalidateQueries({
        queryKey: [paths.QUERY_KEY.solutionDetails, solutionId],
      });
    },

    onError: () => {
      toast.error(t('ToastMessage.Solution.Dislike.Error'));
    },
  });

  const mutationUnInteraction = useMutation({
    mutationFn: () => actionUnInteraction(solutionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [paths.QUERY_KEY.solutionDetails, solutionId],
      });
    },
  });

  return { mutationDislike, mutationLike, mutationUnInteraction };
};

export default useActionsOfSolution;
