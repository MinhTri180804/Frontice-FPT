import { Dispatch, SetStateAction } from 'react';
import useActionsOfSolution from '../../../../../../hooks/useActionsOfSolution';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

interface State {
  solutionId: string;
}

interface Action {
  setIsLike: Dispatch<SetStateAction<boolean>>;
  setIsDislike: Dispatch<SetStateAction<boolean>>;
  setIsPendingLike: Dispatch<SetStateAction<boolean>>;
  setIsPendingDislike: Dispatch<SetStateAction<boolean>>;
}

interface Status {
  isLike: boolean;
  isDislike: boolean;
}

interface IUseActionsOfSolutionLogicProps {
  data: State;
  action: Action;
  status: Status;
}
const useActionsOfSolutionLogic = ({
  data: { solutionId },
  action: { setIsDislike, setIsLike, setIsPendingDislike, setIsPendingLike },
  status: { isDislike, isLike },
}: IUseActionsOfSolutionLogicProps) => {
  const { t } = useTranslation();
  const { mutationDislike, mutationLike, mutationUnInteraction } =
    useActionsOfSolution(solutionId);

  const handleLikeAction = async () => {
    setIsPendingLike(true);
    if (isLike) {
      try {
        await mutationUnInteraction.mutateAsync();
        setIsLike(false);
        return;
      } catch (error) {
        toast.error(t('ToastMessage.Solution.UnInteraction.Like.Error'));
        console.log('[ERROR]: ', error);
        return;
      } finally {
        setIsPendingLike(false);
      }
    }

    if (isDislike) {
      try {
        await mutationUnInteraction.mutateAsync();
        setIsDislike(false);
      } catch (error) {
        console.log('[ERROR]: ', error);
        return;
      } finally {
        setIsPendingLike(false);
      }
    }

    mutationLike
      .mutateAsync()
      .then(() => {
        setIsLike(true);
      })
      .catch((error) => {
        console.log('[ERROR]: ', error);
      })
      .finally(() => {
        setIsPendingLike(false);
      });
  };

  const handleDislikeAction = async () => {
    setIsPendingDislike(true);
    if (isDislike) {
      try {
        await mutationUnInteraction.mutateAsync();
        setIsDislike(false);
        return;
      } catch (error) {
        toast.error(t('ToastMessage.Solution.UnInteraction.Dislike.Error'));
        console.log('[ERROR]: ', error);
        return;
      } finally {
        setIsPendingDislike(false);
      }
    }

    if (isLike) {
      try {
        await mutationUnInteraction.mutateAsync();
        setIsLike(false);
      } catch (error) {
        console.log('[ERROR]: ', error);
        return;
      } finally {
        setIsPendingDislike(false);
      }
    }

    mutationDislike
      .mutateAsync()
      .then(() => setIsDislike(true))
      .catch((error) => console.log('[ERROR]: ', error))
      .finally(() => {
        setIsPendingDislike(false);
      });
  };

  const handleClickComments = () => {
    const element = document.getElementById('feedback-solution');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return { handleLikeAction, handleDislikeAction, handleClickComments };
};

export default useActionsOfSolutionLogic;
