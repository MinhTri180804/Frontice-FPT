import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  NotificationIcon,
  UpAndDownIcon,
} from '../../../../../../../assets/icons';
import { paths } from '../../../../../../../constant';
import { useAuthStore } from '../../../../../../../store/authStore';
import { IOptionLanguage } from '../../../../../../../types/entity';
import { IOptionSelectItem } from '../../../../../../../types/entity/components';
import { Button, OptionSelect } from '../../../../../../common';
import { ConditionWrapper } from '../../../../../../wrapper';
import { Dropdown } from './partials';
import './UserProfile.scss';

const UserProfile: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { profile, isAuthentication } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const languageOptions: IOptionSelectItem[] = [
    {
      displayContent: `🇻🇳 ${t('Language.Vietnamese')}`,
      optionValue: 'vi' as IOptionLanguage,
    },

    {
      displayContent: `🇺🇸 ${t('Language.English')}`,
      optionValue: 'en' as IOptionLanguage,
    },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleSetDefaultOptionLanguage: () => IOptionSelectItem = () => {
    const language = i18n.language as IOptionLanguage;
    if (language === 'vi') {
      return languageOptions[0];
    }

    if (language === 'en') {
      return languageOptions[1];
    }

    return languageOptions[1];
  };

  const selectOptionLanguage: (optionValue: string) => void = (optionValue) => {
    const optionLanguageValue = optionValue as IOptionLanguage;
    i18n.changeLanguage(optionLanguageValue);

    if (optionLanguageValue === 'en') {
      toast.success(
        t('ChangeLanguage.success', {
          language: t('Language.English'),
        }),
      );
    }

    if (optionLanguageValue === 'vi') {
      toast.success(
        t('ChangeLanguage.success', {
          language: t('Language.Country'),
        }),
      );
    }
  };

  const avatarDefault =
    'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';

  return (
    <div className="user-profile-container">
      <div className="option">
        <OptionSelect
          style={{
            width: '200px',
          }}
          handleSelect={selectOptionLanguage}
          defaultOptionSelect={handleSetDefaultOptionLanguage()}
          options={languageOptions}
        />
      </div>

      <div className="notification-icon">
        <NotificationIcon width={24} height={24} />
      </div>
      <ConditionWrapper
        condition={Boolean(isAuthentication && profile)}
        fallback={() => {
          return (
            <div className="option-authentication">
              <Button
                buttonSize="small"
                label={t('Button.Login')}
                styleType="secondary"
                onClick={() => {
                  navigate(`${paths.auth}/${paths.login}`, {
                    state: {
                      previousPage: location.pathname,
                    },
                  });
                }}
              />

              <Button
                buttonSize="small"
                label={t('Button.Register')}
                styleType="secondary"
                onClick={() => {
                  navigate(`${paths.auth}/${paths.register}`);
                }}
              />
            </div>
          );
        }}
      >
        <div className="user-profile" onClick={toggleDropdown}>
          <div className="user-avatar">
            <img
              src={profile?.image || avatarDefault}
              alt={t('Layout.Header.UserProfile.avatar')}
            />
          </div>
          <div className="user-info">
            <div className="user-name">
              {profile?.firstname} {profile?.lastname}
            </div>
            <div className="user-id">@{profile?.username}</div>
          </div>
          <div className="drop-down">
            <UpAndDownIcon width={24} height={24} stroke="black" />
          </div>

          <Dropdown isOpen={isDropdownOpen} />
        </div>
      </ConditionWrapper>
    </div>
  );
};

export default UserProfile;
