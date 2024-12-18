import {
  ArrowLeftEndOnRectangleIcon,
  Cog6ToothIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { paths } from '../../../../../../../../../constant';
import authService from '../../../../../../../../../services/authServices';
import { useAuthStore } from '../../../../../../../../../store/authStore';
import './Dropdown.scss';

interface DropdownProps {
  isOpen: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ isOpen }) => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleLogout: () => void = async () => {
    await toast.promise(
      authService
        .logout()
        .then(() => {
          logout();
          navigate(`${paths.auth}/${paths.login}`);
          const MESSAGE_SUCCESS = t('ToastMessage.Auth.Logout.Success');
          return MESSAGE_SUCCESS;
        })
        .catch(() => {
          const MESSAGE_ERROR = t('ToastMessage.Auth.Logout.Error');
          throw MESSAGE_ERROR;
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
