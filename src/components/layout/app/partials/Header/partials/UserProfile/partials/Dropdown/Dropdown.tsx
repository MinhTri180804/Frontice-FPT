import React from 'react';
import './Dropdown.scss';
import {
  Cog6ToothIcon,
  UserIcon,
  ArrowLeftEndOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../../../../../../../../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../../../../../../../constant';
import authService from '../../../../../../../../../services/authServices';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { IOptionLanguage } from '../../../../../../../../../types/entity';
import { IBaseResponse } from '../../../../../../../../../types/base';
import { Link } from 'react-router-dom';

interface DropdownProps {
  isOpen: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ isOpen }) => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const language = i18n.language as IOptionLanguage;
  const handleLogout: () => void = async () => {
    await toast.promise(
      authService
        .logout()
        .then((response) => {
          logout();
          navigate(`${paths.auth}/${paths.login}`);
          const MESSAGE_SUCCESS = t('ToastMessage.Auth.Logout.Success');
          if (language === 'en') {
            return response.data.messageEng || MESSAGE_SUCCESS;
          }

          if (language === 'vi') {
            return response.data.messageVN || MESSAGE_SUCCESS;
          }
        })
        .catch((response: IBaseResponse<null>) => {
          const MESSAGE_ERROR = t('ToastMessage.Auth.Logout.Error');
          if (language === 'en') {
            throw response.messageEng || MESSAGE_ERROR;
          }

          if (language === 'vi') {
            throw response.messageVN || MESSAGE_ERROR;
          }
        }),
      {
        pending: t('ToastMessage.Auth.Logout.Pending'),
        success: {
          render: (response) => {
            return response.data as string;
          },
        },
        error: {
          render: (response) => {
            return response.data as string;
          },
        },
      },
    );
  };
  return (
    <div className={`dropdown-container ${isOpen ? 'open' : ''}`}>
      <div className="dropdown-item">
        <Cog6ToothIcon height={24} width={24} color="#000" />
        <Link to={`${paths.setting}`}>{t('Setting')}</Link>
      </div>
      <div className="dropdown-item">
        <UserIcon height={24} width={24} color="#000" />
        <Link to={paths.profile}>{t('Profile')}</Link>
      </div>
      <div className="dropdown-item" onClick={handleLogout}>
        <ArrowLeftEndOnRectangleIcon height={24} width={24} color="#000" />
        <span>{t('Logout')}</span>
      </div>
    </div>
  );
};

export default Dropdown;
