import { FC } from 'react';
import { ITaskEntity } from '../../../../../types/entity/task';
import { useTranslation } from 'react-i18next';

interface IExpiredTimeProps {
  timeData?: ITaskEntity['expiredAt'];
}
const ExpiredTime: FC<IExpiredTimeProps> = ({ timeData }) => {
  const { t } = useTranslation();

  return (
    <div className="expired__time-component">
      <div className="label">{t('Label.ExpiredTime')}</div>
      <div className="value"></div>
    </div>
  );
};

export default ExpiredTime;
