import './buttonChallengeOverview.scss';
import { FC } from 'react';
import Button from '../../../Button';
import { IChallengeEntity } from '../../../../../types/entity';
import { useLocation, useNavigate } from 'react-router-dom';
import { paths } from '../../../../../constant';
import { toast, ToastContentProps } from 'react-toastify';
import challengeService from '../../../../../services/challengeService';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../../../../store/authStore';

type IButtonConditionChallengeOverviewProps = Pick<
  IChallengeEntity,
  'isJoin' | 'isSubmit' | 'enoughPoint' | 'solutionSubmitId' | 'id'
> & {
  eventClick: () => void;
  challengePremium: boolean;
};

const ButtonConditionChallengeOverview: FC<
  IButtonConditionChallengeOverviewProps
> = ({
  isJoin,
  isSubmit,
  enoughPoint,
  solutionSubmitId,
  id: challengeId,
  eventClick,
  challengePremium,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { profile, isAuthentication } = useAuthStore();
  const location = useLocation();
  const pathName = location.pathname;

  const handleJoinChallenge = async () => {
    await toast.promise(
      challengeService
        .join({ challengeId })
        .then(() => {
          const MESSAGE_SUCCESS = t('ToastMessage.Challenger.Join.Success');
          eventClick();
          return MESSAGE_SUCCESS;
        })
        .catch(() => {
          const MESSAGE_ERROR = t('ToastMessage.Challenger.Join.Error');
          return MESSAGE_ERROR;
        }),
      {
        pending: t('ToastMessage.Challenger.Join.Peding'),
        success: {
          render: (responseOfSuccess) => {
            return responseOfSuccess.data;
          },
        },
        error: {
          render: (responseOfError: ToastContentProps<string>) => {
            return responseOfError.data;
          },
        },
      },
    );
  };

  const handleSubmitChallenge = () => {
    if (pathName === paths.submitSolution) {
      const element = document.getElementById('form-submit');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(paths.submitSolution, {
        state: {
          challengeId,
        },
      });
    }
  };

  const handleGoToSolution = () => {
    navigate(`${paths.solutionDetails}/${solutionSubmitId}`);
  };

  if (
    isAuthentication &&
    profile &&
    challengePremium &&
    profile?.gold_account !== true
  ) {
    return (
      <Button
        styleType="primary"
        label="Join Challenge"
        buttonSize="normal"
        disabled
      />
    );
  }

  if (!enoughPoint) {
    return (
      <Button
        styleType="primary"
        label="Join Challenge"
        buttonSize="normal"
        disabled
      />
    );
  }

  if (!isJoin) {
    return (
      <Button
        styleType="primary"
        label="Join challenge"
        buttonSize="normal"
        onClick={handleJoinChallenge}
      />
    );
  }

  if (isJoin && !isSubmit) {
    return (
      <Button
        styleType="primary"
        label="Submit Challenge"
        buttonSize="normal"
        onClick={handleSubmitChallenge}
      />
    );
  }

  if (isJoin && isSubmit) {
    return (
      <Button
        styleType="primary"
        label="Go to my solution"
        buttonSize="normal"
        onClick={handleGoToSolution}
      />
    );
  }
};

export default ButtonConditionChallengeOverview;
