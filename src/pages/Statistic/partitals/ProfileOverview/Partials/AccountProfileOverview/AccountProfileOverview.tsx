import classNames from 'classnames';
import './AccountProfileOverview.scss';
import { FC, HTMLProps } from 'react';

interface IAccountProfileOverviewProps extends HTMLProps<HTMLDivElement> {
  avatarUrl: string;
  name: string;
  email: string;
}
const AccountProfileOverview: FC<IAccountProfileOverviewProps> = ({
  avatarUrl,
  name,
  email,
  className,
}) => {
  const accountProfileOverviewClass = classNames(
    'account__profile-overview--component',
    className,
  );
  return (
    <div className={accountProfileOverviewClass}>
      <div className="avatar">
        <img src={avatarUrl} alt="" />
      </div>
      <div className="about">
        <div className="name">{name}</div>
        <div className="email">{email}</div>
      </div>
    </div>
  );
};

export default AccountProfileOverview;
