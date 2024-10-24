import { FC } from 'react';
import {
  Form,
  FormSubmitHandler,
  RegisterOptions,
  useForm,
} from 'react-hook-form';
import { Button, Input } from '../../../../components/common';
import './submitSolutionForm.scss';

interface ISubmitSolutionForm {
  title: string;
  technicalList: string[];
  repositoryURL: string;
  liveSiteURL: string;
  descriptionAbout: {
    title: string;
    description: string;
  }[];
}
const SubmitSolutionForm: FC = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<ISubmitSolutionForm>();
  const handleSubmitSolution: FormSubmitHandler<ISubmitSolutionForm> = () => {
    console.log('submit solution');
  };
  const ruleOfTitle: RegisterOptions<ISubmitSolutionForm, 'title'> = {
    required: {
      value: true,
      message: 'Title solution is not empty',
    },
  };

  const ruleOfTechnicalList: RegisterOptions<
    ISubmitSolutionForm,
    'technicalList'
  > = {
    required: {
      value: true,
      message: 'Technical list is not empty',
    },
  };

  const ruleOfRepositoryURL: RegisterOptions<
    ISubmitSolutionForm,
    'repositoryURL'
  > = {
    required: {
      value: true,
      message: 'Repository URL is not empty',
    },

    // TODO: implement validate url github repo
  };

  const ruleOfLiveSiteURL: RegisterOptions<ISubmitSolutionForm, 'liveSiteURL'> =
    {
      required: {
        value: true,
        message: 'Live site URL is not empty',
      },
      // TODO: implement validate url github repo
    };

  return (
    <Form
      control={control}
      onSubmit={handleSubmitSolution}
      className="form__submit-solution-component"
    >
      <Input
        {...register('title', ruleOfTitle)}
        label="Title solution"
        required
        message={errors.title?.message}
        status={errors.title && 'error'}
      />
      <Input
        {...register('technicalList', ruleOfTechnicalList)}
        label="which tools, library, framework, or method did you use for this project ?"
        message={errors.technicalList?.message}
        status={errors.title && 'error'}
      />
      <Input
        {...register('repositoryURL', ruleOfRepositoryURL)}
        label="repository URL"
        required
        message={errors.repositoryURL?.message}
        status={errors.repositoryURL && 'error'}
      />
      <Input
        {...register('liveSiteURL', ruleOfLiveSiteURL)}
        label="live site URL"
        required
        message={errors.liveSiteURL?.message}
        status={errors.liveSiteURL && 'error'}
      />

      <Input
        {...register('descriptionAbout', {
          required: {
            value: true,
            message: 'error',
          },
        })}
        label="Create description of solution"
        message={errors.liveSiteURL?.message}
        status={errors.liveSiteURL && 'error'}
      />

      <Button
        styleType="primary"
        type="submit"
        label="Submit solution"
        buttonSize="large"
      />
    </Form>
  );
};

export default SubmitSolutionForm;
