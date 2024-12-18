import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContentProps } from 'react-toastify';
import { paths } from '../../../../../constant';
import taskService from '../../../../../services/taskService';
import { useAuthStore } from '../../../../../store/authStore';
import { IChallengeEntity } from '../../../../../types/entity';
import Button from '../../../Button';
import './buttonConditionTaskOverview.scss';

type IButtonConditionChallengeOverviewProps = Pick<
  IChallengeEntity,
  'isJoin' | 'isSubmit' | 'enoughPoint' | 'solutionSubmitId' | 'id'
> & {
  eventClick: () => void;
  challengePremium: boolean;
};

const ButtonConditionTaskOverview: FC<
  IButtonConditionChallengeOverviewProps
> = ({
  isJoin,
  isSubmit,
  enoughPoint,
  solutionSubmitId,
  id: taskId,
  eventClick,
  challengePremium,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { profile, isAuthentication } = useAuthStore();
  const location = useLocation();
  const pathName = location.pathname;
  const handleJoinTask = async () => {
    await toast.promise(
      taskService
        .join({ taskId })
        .then(() => {
          const MESSAGE_SUCCESS = t('ToastMessage.Task.Join.Success');
          eventClick();
          return MESSAGE_SUCCESS;
        })
        .catch(() => {
          const MESSAGE_ERROR = t('ToastMessage.Task.Join.Error');
          return MESSAGE_ERROR;
        }),
      {
        pending: t('ToastMessage.Task.Join.Peding'),
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

  const handleSubmitTask = () => {
    if (pathName === paths.submitSolutionTask) {
      const element = document.getElementById('form-submit');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(paths.submitSolutionTask, {
        state: {
          taskId,
        },
      });
    }
  };

  const handleGoToSolution = () => {
    navigate(`${paths.solutionDetails}/${solutionSubmitId}`, {
      state: {
        challengeId: taskId,
      },
    });
  };

  const handleGotoChallengeDetails = () => {
    navigate(`${paths.challengeDetails}/${taskId}`);
  };

  if (pathName.split('/')[1] === paths.solutionDetails.split('/')[1]) {
    console.log(1);
    return (
      <Button
        styleType="primary"
        label="Go to task details"
        buttonSize="normal"
        onClick={handleGotoChallengeDetails}
      />
    );
  }

  if (
    isAuthentication &&
    profile &&
    challengePremium &&
    profile?.gold_account !== true
  ) {
    return (
      <Button
        styleType="primary"
        label="Join Task"
        buttonSize="normal"
        disabled
      />
    );
  }

  if (!enoughPoint) {
    return (
      <Button
        styleType="primary"
        label="Join Task"
        buttonSize="normal"
        disabled
      />
    );
  }

  if (!isJoin) {
    return (
      <Button
        styleType="primary"
        label="Join Task"
        buttonSize="normal"
        onClick={handleJoinTask}
      />
    );
  }

  if (isJoin && !isSubmit) {
    return (
      <Button
        styleType="primary"
        label="Submit Task"
        buttonSize="normal"
        onClick={handleSubmitTask}
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

export default ButtonConditionTaskOverview;
