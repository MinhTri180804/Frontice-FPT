import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { IOptionLanguage } from '../../../types/entity';
import { IOptionSelectItem } from '../../../types/entity/components';
import { OptionSelect } from '../../common';
import './authLayout.scss';
import { AuthForm } from './Partials/AuthForm';
import { AuthWelcome } from './Partials/AuthWelcome';

const AuthLayout: FC = () => {
  const { i18n } = useTranslation();
  const handleSelectOptionLanguage: (optionValue: string) => void = (
    optionValue,
  ) => {
    i18n.changeLanguage(optionValue as IOptionLanguage);
  };

  const languageOptions: IOptionSelectItem[] = [
    {
      displayContent: `🇻🇳`,
      optionValue: 'vi' as IOptionLanguage,
    },

    {
      displayContent: `🇺🇸`,
      optionValue: 'en' as IOptionLanguage,
    },
  ];

  // TODO: refactor
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

  return (
    <div className="auth__layout-container">
      <div className="wrap">
        <div className="auth__welcome-section">
          <AuthWelcome />
        </div>
        <div className="auth__form-section">
          <AuthForm>
            <Outlet />
          </AuthForm>
        </div>
      </div>
      <OptionSelect
        className="option__language"
        handleSelect={handleSelectOptionLanguage}
        options={languageOptions}
        defaultOptionSelect={handleSetDefaultOptionLanguage()}
      />
    </div>
  );
};

export default AuthLayout;
