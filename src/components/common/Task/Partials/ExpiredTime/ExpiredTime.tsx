import './expiredTime.scss';
import { FC } from 'react';
import { ITaskEntity } from '../../../../../types/entity/task';
import { useTranslation } from 'react-i18next';
import useTimeCountDown from '../../../../../hooks/useTimeCountDown';

interface IExpiredTimeProps {
  expiredTime: ITaskEntity['expiredAt'];
}
const ExpiredTime: FC<IExpiredTimeProps> = ({ expiredTime }) => {
  const { t } = useTranslation();
  const time = useTimeCountDown(Number(expiredTime) * 1000);

  return (
    <div className="expired__time-component">
      <div className="label">{t('Label.ExpiredTime')}</div>
      <div className="value">
        {time?.days && `${time.days} : `} {time?.hours && `${time.hours} : `}
        {time?.minutes && `${time.minutes} : `}
        {time?.seconds && `${time.seconds}`}
      </div>
    </div>
  );
};

export default ExpiredTime;
