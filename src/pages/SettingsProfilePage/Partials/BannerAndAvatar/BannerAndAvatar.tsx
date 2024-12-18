import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import authService from '../../../../services/authServices';
import { useAuthStore } from '../../../../store/authStore';
import './BannerAndAvatar.scss';

const BannerAndAvatar: React.FC = () => {
  const { t } = useTranslation();
  const profile = useAuthStore((state) => state.profile);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const [avatarPreview, setAvatarPreview] = useState(
    profile?.image ||
      'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
  );

  const uploadAvatarMutation = useMutation({
    mutationFn: async (file: File) =>
      await toast.promise(authService.uploadImage(file), {
        pending: 'Đang đăng tải ảnh đại diện',
        error: 'Đăng tải ảnh đại diện thất bại',
        success: 'Đăng tải ảnh diện thành công',
      }),
    onSuccess: async (data) => {
      setAvatarPreview(data.data.link);
      await toast.promise(
        authService.updateProfile({ image: data.data.path }).then(() => {
          if (profile) {
            updateProfile({ ...profile, image: data.data.link });
          }
        }),
        {
          pending: 'Đang thực hiện cập nhật ảnh đại diện',
          success: 'Cập nhật ảnh đại diện thành công',
          error: 'Cập nhật ảnh đại diện thất bại',
        },
      );
    },
    onError: (error) => {
      console.error('Error uploading avatar:', error);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview image before upload
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    uploadAvatarMutation.mutate(file);
  };

  return (
    <div className="container-banner-avatar" id="banner-avatar-section">
      <div className="title-avatar" id="avatar">
        {t('Avatar')}
      </div>
      <div className="container-avatar">
        <div className="image-action">
          <div className="image">
            <img src={avatarPreview} alt="" />
          </div>
          <div className="action">
            <input
              type="file"
              id="uploadFileAvatar"
              name="myfile"
              accept="image/*"
              title="Please upload your file"
              onChange={handleFileChange}
            />
            <label htmlFor="uploadFileAvatar">
              <ArrowUpTrayIcon />
              <p>{t('Upload file')}</p>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BannerAndAvatar;
