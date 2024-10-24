import { paths } from '../constant';
import {
  IAccountEntity,
  IOptionLanguage,
  IProfileEntity,
} from '../types/entity';

// Email before register
const saveEmailSignUp: (email: string) => void = (email) => {
  localStorage.setItem(paths.LOCAL_STORAGE.emailRegister, email);
};

const getEmailSignUp: () => string | null = () => {
  const emailSignUp = localStorage.getItem(paths.LOCAL_STORAGE.emailRegister);

  if (emailSignUp) {
    return emailSignUp;
  }

  return null;
};

const removeEmailSignUp: () => void = () => {
  localStorage.removeItem(paths.LOCAL_STORAGE.emailRegister);
};

// save accessToken
const saveAccessToken: (accessToken: string) => void = (accessToken) => {
  localStorage.setItem(paths.LOCAL_STORAGE.accessToken, accessToken);
};

const removeAccessToken: () => void = () => {
  localStorage.removeItem(paths.LOCAL_STORAGE.accessToken);
};

const getAccessToken: () => string | null = () => {
  const accessToken = localStorage.getItem(paths.LOCAL_STORAGE.accessToken);
  return accessToken;
};

// save refreshToken
const saveRefreshToken: (refreshToken: string) => void = (refreshToken) => {
  localStorage.setItem(paths.LOCAL_STORAGE.refreshToken, refreshToken);
};

const getRefreshToken: () => string | null = () => {
  const refreshToken = localStorage.getItem(paths.LOCAL_STORAGE.refreshToken);
  if (refreshToken) return refreshToken;

  return null;
};

const removeRefreshToken: () => void = () => {
  localStorage.removeItem(paths.LOCAL_STORAGE.refreshToken);
};

// Save account
const saveAccount: (dataAccount: IAccountEntity) => void = (dataAccount) => {
  const dataFormat = JSON.stringify(dataAccount);
  localStorage.setItem(paths.LOCAL_STORAGE.account, dataFormat);
};

const getAccount: () => IAccountEntity | null = () => {
  const dataAccount = localStorage.getItem(paths.LOCAL_STORAGE.account);
  if (dataAccount) {
    return JSON.parse(dataAccount);
  }

  return null;
};

const removeAccount: () => void = () => {
  localStorage.removeItem(paths.LOCAL_STORAGE.account);
};

// profile;

const saveInfo: (dataProfile: IProfileEntity) => void = (dataProfile) => {
  const dataFormat = JSON.stringify(dataProfile);
  localStorage.setItem(paths.LOCAL_STORAGE.profile, dataFormat);
};

const getInfo: () => IProfileEntity | null = () => {
  const dataProfile = localStorage.getItem(paths.LOCAL_STORAGE.profile);
  if (dataProfile) {
    return JSON.parse(dataProfile) as IProfileEntity;
  }

  return null;
};

const removeInfo: () => void = () => {
  localStorage.removeItem(paths.LOCAL_STORAGE.profile);
};

// Email forgot password
const saveEmailForgotPassword: (email: string) => void = (email) => {
  localStorage.setItem(paths.LOCAL_STORAGE.emailForgotPassword, email);
};

const getEmailForgotPassword: () => string | null = () => {
  const emailForgotPassword = localStorage.getItem(
    paths.LOCAL_STORAGE.emailForgotPassword,
  );
  if (emailForgotPassword) {
    return emailForgotPassword;
  }

  return null;
};

const removeEmailForgotPassword: () => void = () => {
  localStorage.removeItem(paths.LOCAL_STORAGE.emailForgotPassword);
};

const saveLanguageI18: (language: IOptionLanguage) => void = (language) => {
  localStorage.setItem(paths.LOCAL_STORAGE.i18nLanguage, language);
};

const getLanguageI18: () => IOptionLanguage | null = () => {
  const language = localStorage.getItem(
    paths.LOCAL_STORAGE.i18nLanguage,
  ) as IOptionLanguage;

  if (language) return language;
  return null;
};

const removeLanguageI18: () => void = () => {
  localStorage.removeItem(paths.LOCAL_STORAGE.i18nLanguage);
};

export {
  saveLanguageI18,
  getLanguageI18,
  removeLanguageI18,
  getAccessToken,
  getAccount,
  getEmailForgotPassword,
  getEmailSignUp,
  getRefreshToken,
  removeAccessToken,
  removeAccount,
  removeEmailForgotPassword,
  removeEmailSignUp,
  removeRefreshToken,
  saveAccessToken,
  saveAccount,
  saveEmailForgotPassword,
  saveEmailSignUp,
  saveRefreshToken,
  saveInfo,
  getInfo,
  removeInfo,
};
