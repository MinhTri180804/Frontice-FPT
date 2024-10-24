import classNames from 'classnames';
import './aboutProfileOverview.scss';
import { FC, HTMLProps } from 'react';

interface IAboutProfileOverviewProps extends HTMLProps<HTMLDivElement> {
  title: string;
  value: string | number;
}

const AboutProfileOverview: FC<IAboutProfileOverviewProps> = ({
  title,
  value,
  className,
}) => {
  const aboutProfileOverviewClass = classNames(
    'about__profile-overview--component',
    className,
  );
  return (
    <div className={aboutProfileOverviewClass}>
      <div className="title">{title}</div>
      <div className="value">{value}</div>
    </div>
  );
};

export default AboutProfileOverview;
