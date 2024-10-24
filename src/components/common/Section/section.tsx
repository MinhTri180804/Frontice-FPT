import './section.scss';
import classNames from 'classnames';
import { FC, HTMLProps, ReactNode } from 'react';

interface ISectionProps extends HTMLProps<HTMLDivElement> {
  title?: string;
  titlePosition?: 'left' | 'center' | 'right';
  iconPosition?: 'left' | 'right';
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  children: ReactNode;
}

const Section: FC<ISectionProps> = ({
  title,
  titlePosition = 'left',
  iconPosition = 'left',
  Icon,
  children,
  className,
}) => {
  const sectionClass = classNames('section__component', className, {
    'title-right': titlePosition === 'right',
    'title-center': titlePosition === 'center',
    'title-left': titlePosition === 'left',
    'icon-reverse': iconPosition === 'right',
  });

  return (
    <section className={sectionClass}>
      {title && (
        <div className="heading">
          <div className="title">
            {iconPosition && Icon && <Icon className="icon" />}
            <div className="value">{title}</div>
          </div>
        </div>
      )}
      <div className="content">{children}</div>
    </section>
  );
};
export default Section;
