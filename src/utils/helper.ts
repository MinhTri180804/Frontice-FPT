import { jwtDecode } from 'jwt-decode';
import { paths } from '../constant';

const i18nHelper = {
  getLanguageSystemStaff: () => {
    const language = navigator.language;
    const [firstKeyLanguage] = language.split('-');
    return firstKeyLanguage;
  },
};

const checkAuthentication: () => boolean = () => {
  const refreshToken = localStorage.getItem(paths.LOCAL_STORAGE.refreshToken);
  const profile = localStorage.getItem(paths.LOCAL_STORAGE.profile);

  if (!refreshToken || !profile) {
    return false;
  }
  const refreshTokenValidity = checkRefreshTokenValidity(refreshToken);

  if (!refreshTokenValidity) {
    return false;
  }

  return true;
};

const checkRefreshTokenValidity: (refreshToken: string) => boolean = (
  refreshToken,
) => {
  const decodeRefreshToken = jwtDecode(refreshToken);
  const currentTime = Date.now() / 1000;

  if (typeof decodeRefreshToken.exp !== 'number') {
    return false;
  }

  if (decodeRefreshToken.exp < currentTime) {
    return false;
  }

  return true;
};

const handleDownloadFile = (fileUrl: string) => {
  const link = document.createElement('a');
  link.href = fileUrl;
  link.setAttribute('download', '');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const logOnDev = (message: string) => {
  if (import.meta.env.MODE === 'development') {
    console.log(message);
  }
};

const handleClickNewTab = (url: string) => {
  const newTab = window.open(url, '_blank');
  if (newTab) {
    newTab.focus();
  }
};

export {
  checkAuthentication,
  checkRefreshTokenValidity,
  i18nHelper,
  handleDownloadFile,
  logOnDev,
  handleClickNewTab,
};
