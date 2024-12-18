import { FC } from 'react';
import { ErrorTemplate } from '../../../components/common/ErrorTemplate';
import { unauthorizedImage } from '../../../assets/images';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/common';
import { useLocation, useNavigate } from 'react-router-dom';
import { paths } from '../../../constant';

const UnauthorizedPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <ErrorTemplate
      imageError={unauthorizedImage}
      errorText={t('Page.Unauthorized.ErrorText')}
      title={t('Page.Unauthorized.title')}
      description={t('Page.Unauthorized.Description')}
      actions={() => {
        return (
          <>
            <Button
              label={t('Button.BackToHomePage')}
              styleType="secondary"
              buttonSize="normal"
              onClick={() => navigate(paths.home)}
              style={{ width: 'fit-content' }}
            />
            <Button
              label={t('Button.Login')}
              styleType="primary"
              buttonSize="normal"
              onClick={() =>
                navigate(`${paths.auth}/${paths.login}`, {
                  state: {
                    previousPage: pathname,
                  },
                })
              }
              style={{
                flex: '1',
              }}
            />
          </>
        );
      }}
    />
  );
};

export default UnauthorizedPage;
