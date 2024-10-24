import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline';
import './sectionStatistic.scss';
import { FC, HTMLProps, ReactNode } from 'react';
import classNames from 'classnames';

interface ISectionStatisticProps extends HTMLProps<HTMLDivElement> {
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  options?: boolean;
  children: ReactNode;
}

const SectionStatistic: FC<ISectionStatisticProps> = ({
  Icon,
  title,
  options = false,
  children,
  className,
}) => {
  const sectionStatisticComponentClass = classNames(
    'section__statistic-component',
    className,
  );
  return (
    <section className={sectionStatisticComponentClass}>
      <div className="heading">
        <div className="title">
          {Icon && (
            <div className="icon">
              <Icon />
            </div>
          )}
          <div className="value">{title}</div>
        </div>

        {options && (
          <div className="options">
            <EllipsisHorizontalCircleIcon />
          </div>
        )}
      </div>

      {children}
    </section>
  );
};

export default SectionStatistic;
