import { FC } from 'react';
import {
  Form,
  FormSubmitHandler,
  RegisterOptions,
  useForm,
} from 'react-hook-form';
import { Button, Input } from '../../../../components/common';
import { ISubmitSolutionRequest } from '../../../../types/request';
import './submitSolutionForm.scss';
import { useTranslation } from 'react-i18next';
import { toast, ToastContentProps } from 'react-toastify';
import solutionService from '../../../../services/solutionService';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../../constant';

type ISubmitSolutionFormProps = {
  challengeId: string;
};

const SubmitSolutionForm: FC<ISubmitSolutionFormProps> = ({ challengeId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
  register,
    control,
    formState: { errors },
  } = useForm<ISubmitSolutionRequest>({
    defaultValues: {
      challenge_id: challengeId,
    },
  });
  const handleSubmitSolution: FormSubmitHandler<
    ISubmitSolutionRequest
  > = async (data) => {
    await toast.promise(
      solutionService
        .submitSolution(data.data)
        .then(() => {
          // TODO: implement redirect solution details when submit success
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
  const ruleOfTitle: RegisterOptions<ISubmitSolutionRequest, 'title'> = {
    required: {
      value: true,
      message: 'Title solution is not empty',
    },
  };

  const ruleOfRepositoryURL: RegisterOptions<ISubmitSolutionRequest, 'github'> =
    {
      required: {
        value: true,
        message: 'Repository URL is not empty',
      },

      // TODO: implement validate url github repo
    };

  const ruleOfLiveSiteURL: RegisterOptions<
    ISubmitSolutionRequest,
    'live_github'
  > = {
    required: {
      value: true,
      message: 'Live site URL is not empty',
    },
    // TODO: implement validate url github repo
  };

  const ruleOfPrideOf: RegisterOptions<ISubmitSolutionRequest, 'pride_of'> = {
    required: false,
  };

  const ruleOfChallengeOvercome: RegisterOptions<
    ISubmitSolutionRequest,
    'challenge_overcome'
  > = {
    required: false,
  };

  const ruleOfHelpWith: RegisterOptions<ISubmitSolutionRequest, 'help_with'> = {
    required: false,
  };

  return (
    <Form
      control={control}
      onSubmit={handleSubmitSolution}
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

      <Input
        {...register('pride_of', ruleOfPrideOf)}
        label={t('Field.PrideOf')}
        message={errors.pride_of?.message}
        status={errors.pride_of && 'error'}
      />

      <Input
        {...register('challenge_overcome', ruleOfChallengeOvercome)}
        label={t('Field.ChallengeOvercome')}
        message={errors.challenge_overcome?.message}
        status={errors.challenge_overcome && 'error'}
      />

      <Input
        {...register('help_with', ruleOfHelpWith)}
        label={t('Field.HelpWith')}
        required
        message={errors.help_with?.message}
        status={errors.help_with && 'error'}
      />

      <Button
        styleType="primary"
        label={t('Button.Submit.Solution')}
        buttonSize="large"
      />
    </Form>
  );
};

export default SubmitSolutionForm;
