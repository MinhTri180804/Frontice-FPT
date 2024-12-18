import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Input } from '../../../../components/common';
import authService from '../../../../services/authServices';
import { useAuthStore } from '../../../../store/authStore';
import { IUpdateProfileRequest } from '../../../../types/entity/pracing';
import './PersonalInformation.scss';

const PersonalInformation: React.FC = () => {
  const { t } = useTranslation();
  const profile = useAuthStore((state) => state.profile);
  const navigate = useNavigate();
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const { register, handleSubmit } = useForm<IUpdateProfileRequest>({
    defaultValues: {
      firstname: profile?.firstname,
      lastname: profile?.lastname,
      // email: profile?.email,
      phone: profile?.phone,
      bio: profile?.bio,
      github: profile?.github || '',
    },
  });

  const mutationUpdateProfile = useMutation({
    mutationKey: ['update-profile'],
    mutationFn: async (data: IUpdateProfileRequest) =>
      await authService.updateProfile(data),
    onSuccess: async () => {
      return await toast.promise(
        authService
          .info()
          .then((data) => {
            updateProfile(data.data);
          })
          .then(() => {
            navigate('/profile');
          }),
        {
          pending: 'Đang thực hiện cập nhật thông tin',
          error: 'Cập nhật thông tin thất bại',
          success: 'Cập nhật thông tin thành công',
        },
      );
    },
    onError: async () => {
      toast.error('Cập nhật thông tin thất bại');
    },
  });

  const onSubmit: SubmitHandler<IUpdateProfileRequest> = (data) => {
    return toast.promise(mutationUpdateProfile.mutateAsync(data), {
      pending: 'Đang thực hiện thay đổi thông tin',
      error: 'Thay đổi thông tin thất bại',
      success: 'Thay đổi thông tin thành công',
    });
  };

  return (
    <div className="container-personal-informations" id="personal-info-section">
      <div className="title-component">{t('Personal Information')}</div>
      <div className="container-input">
        <div className="row">
          <div className="first" id="name">
            <Input
              label={t('First Name')}
              type="text"
              placeholder={t('Enter your first name')}
              {...register('firstname', { required: t('FirstName.Require') })}
            />
          </div>
          <div className="last">
            <Input
              label={t('Last Name')}
              placeholder={t('Enter your last name')}
              {...register('lastname', { required: t('LastName.Require') })}
            />
          </div>
        </div>

        {/* Email Field */}
        {/* <div className="mail" id="email">
          <Input
            label="Email"
            type="email"
            disabled
            placeholder="Enter your email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Invalid email address',
              },
            })}
          />
        </div> */}

        <div className="github" id="github">
          <Input
            label="Github"
            type="string"
            placeholder="Enter your github"
            {...register('github')}
          />
        </div>

        {/* Bio Field */}
        <div className="bio">
          <div className="title">Bio</div>
          <textarea
            id="bio"
            placeholder="Enter your Bio"
            {...register('bio')}
          ></textarea>
        </div>

        <div className="action-submit-preview">
          <div className="submit">
            <Button
              label={t('Save Settings')}
              styleType="primary"
              buttonSize="large"
              disabled={mutationUpdateProfile.isPending}
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
