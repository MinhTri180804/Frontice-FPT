import { FC } from 'react';
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContentProps } from 'react-toastify';
import { Button, Input } from '../../../../components/common';
import { paths } from '../../../../constant';
import taskService from '../../../../services/taskService';
import { ISubmitSolutionTaskRequest } from '../../../../types/request/task';
import './submitSolutionForm.scss';

type ISubmitSolutionFormProps = {
  taskId: string;
};

const SubmitSolutionForm: FC<ISubmitSolutionFormProps> = ({ taskId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISubmitSolutionTaskRequest>();
  const handleSubmitSolution: SubmitHandler<
    ISubmitSolutionTaskRequest
  > = async (data) => {
    await toast.promise(
      taskService
        .submitSolution({ taskId }, data)
        .then(() => {
          navigate(paths.statistic);
          const MESSAGE_SUCCESS = t('ToastMessage.Solution.Submit.Success');
          return MESSAGE_SUCCESS;
        })
        .catch(() => {
          const MESSAGE_ERROR = t('ToastMessage.Solution.Submit.Error');
          return MESSAGE_ERROR;
        }),
      {
        pending: t('ToastMessage.Solution.Submit.Pending'),
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

  const ruleOfTitle: RegisterOptions<ISubmitSolutionTaskRequest, 'title'> = {
    required: {
      value: true,
      message: 'Title solution is not empty',
    },
  };

  const ruleOfRepositoryURL: RegisterOptions<
    ISubmitSolutionTaskRequest,
    'github'
  > = {
    required: {
      value: true,
      message: 'Repository URL is not empty',
    },

    // TODO: implement validate url github repo
  };

  const ruleOfLiveSiteURL: RegisterOptions<
    ISubmitSolutionTaskRequest,
    'live_github'
  > = {
    required: {
      value: true,
      message: 'Live site URL is not empty',
    },
    // TODO: implement validate url github repo
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitSolution)}
      className="form__submit-solution-component"
      id="form-submit"
    >
      <Input
        {...register('title', ruleOfTitle)}
        label="Title solution"
        required
        message={errors.title?.message}
        status={errors.title && 'error'}
      />
      <Input
        {...register('github', ruleOfRepositoryURL)}
        label="repository URL"
        required
        message={errors.github?.message}
        status={errors.github && 'error'}
      />
      <Input
        {...register('live_github', ruleOfLiveSiteURL)}
        label="live site URL"
        required
        message={errors.live_github?.message}
        status={errors.live_github && 'error'}
      />

      <Button
        styleType="primary"
        label={t('Button.Submit.Solution')}
        buttonSize="large"
      />
    </form>
  );
};

export default SubmitSolutionForm;
