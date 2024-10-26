import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import './conditionMessage.scss';
import { FC } from 'react';
import { useAuthStore } from '../../../../../store/authStore';
import { useTranslation } from 'react-i18next';

interface IConditionMessage {
  enoughPoint: boolean;
  challengePremium: boolean;
}
const ConditionMessage: FC<IConditionMessage> = ({
  enoughPoint,
  challengePremium,
}) => {
  const { isAuthentication, profile } = useAuthStore();
  const { t } = useTranslation();

  let MESSAGE_TEXT;
  console.log('isAuthentication: ', isAuthentication);
  console.log('profile: ', profile);
  console.log('enoughPoint: ', enoughPoint);

  if (
    isAuthentication &&
    profile &&
    challengePremium &&
    profile?.gold_account !== true
  ) {
    MESSAGE_TEXT = t('ChallengeOverview.Error.ChallengeType');
  } else if (!enoughPoint && !isAuthentication && !profile) {
    MESSAGE_TEXT = t('ChallengeOverview.Error.Authentication');
  } else if (!enoughPoint) {
    MESSAGE_TEXT = t('ChallengeOverview.Error.EnoughPoint');
  } else {
    return;
  }

  return (
    <div className="error">
      <div className="icon">
        <ExclamationTriangleIcon width={24} height={24} color="white" />
      </div>

      <div className="message">{MESSAGE_TEXT}</div>
    </div>
  );
};

export default ConditionMessage;
