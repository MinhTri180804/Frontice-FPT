import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.scss';
import { IOptionLanguage } from '../../../../../../../types/entity';
import { paths } from '../../../../../../../constant';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: IOptionLanguage) => {
    i18n.changeLanguage(language);
  };

  const i18Language = i18n.language as IOptionLanguage;

  return (
    <div className="language-switcher">
      <button
        className={i18Language === paths.LANGUAGE.english ? 'active' : ''}
        onClick={() =>
          changeLanguage(paths.LANGUAGE.english as IOptionLanguage)
        }
      >
        EN
      </button>
      <button
        className={i18Language === paths.LANGUAGE.vietnamese ? 'active' : ''}
        onClick={() =>
          changeLanguage(paths.LANGUAGE.vietnamese as IOptionLanguage)
        }
      >
        VI
      </button>
    </div>
  );
};

export default LanguageSwitcher;
