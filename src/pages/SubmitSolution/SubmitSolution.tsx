import { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChallengeOverview } from '../../components/common';
import { paths } from '../../constant';
import { SubmitSolutionForm } from './Partials';
import './submitSolution.scss';
import { useTranslation } from 'react-i18next';

const SubmitSolutionPage: FC = () => {
  const location = useLocation();
  const { challengeId } = location.state;
  const [isSubmit, setIsSubmit] = useState<boolean | null>(null);
  const [isJoin, setIsJoin] = useState<boolean | null>(null);
  const [enoughPoint, setEnoughPoint] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleTransmissionDataFromChildren = (
    submitValue: boolean,
    joinValue: boolean,
    enoughPointValue: boolean,
  ) => {
    setIsJoin(joinValue);
    setIsSubmit(submitValue);
    setEnoughPoint(enoughPointValue);
  };

  if (!enoughPoint && enoughPoint !== null) {
    // TODO: handle redirect to page alert message
    navigate(paths.home);
    return;
  }

  if (isSubmit && isJoin && isSubmit !== null && isJoin !== null) {
    // TODO: handle redirect to page alert message
    navigate(paths.home);
    return;
  }

  if (!challengeId) {
    // TODO: handle redirect to page 404;
    navigate(paths.home);
    return;
  }

  return (
    <div className="submit__solution-page">
      <div className="heading">{t('Page.SubmitSolution.Title')}</div>
      <div className="content">
        <ChallengeOverview
          handleDataTransmissionParent={handleTransmissionDataFromChildren}
          challengeId={challengeId}
        />

        <section className="form__submit-solution">
          <div className="title">{t('Page.SubmitSolution.Form.Title')}</div>
          <SubmitSolutionForm challengeId={challengeId} />
        </section>
      </div>
    </div>
  );
};

export default SubmitSolutionPage;
