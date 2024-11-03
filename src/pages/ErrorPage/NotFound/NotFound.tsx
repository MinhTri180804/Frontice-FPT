import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { notFoundImage } from '../../../assets/images';
import { Button } from '../../../components/common';
import { ErrorTemplate } from '../../../components/common/ErrorTemplate';
import { paths } from '../../../constant';
import './notFound.scss';
import { useTranslation } from 'react-i18next';

interface INotFoundPageProps {
  backToLabel?: string;
  backToLink?: string;
}

const NotFoundPage: FC<INotFoundPageProps> = ({
  backToLabel = null,
  backToLink = null,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="not__found-page">
      <ErrorTemplate
        imageError={notFoundImage}
        errorText="NOT FOUND"
        title="Oops, your force is not strong enough."
        description="This page you requested could not be found. May the force be with you"
        actions={() => (
          <Button
            buttonSize="normal"
            styleType="secondary"
            label={
              backToLabel && backToLink
                ? backToLabel
                : t('Button.BackToHomePage')
            }
            onClick={() =>
              navigate(backToLabel && backToLink ? backToLink : paths.home)
            }
          />
        )}
      />
    </div>
  );
};

export default NotFoundPage;
