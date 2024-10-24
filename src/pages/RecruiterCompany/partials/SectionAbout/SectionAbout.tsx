import classNames from 'classnames';
import './sectionAbout.scss';
import { FC, HTMLProps, ReactNode } from 'react';

interface ISectionAboutOfRecruiterCompanyProps
  extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  borderBottomHeading?: boolean;
  title: string;
}

const SectionAboutOfRecruiterCompany: FC<
  ISectionAboutOfRecruiterCompanyProps
> = ({ children, title, borderBottomHeading = false, className }) => {
  const sectionAboutClass = classNames(className, 'section__about-component', {
    'border-bottom-heading': borderBottomHeading,
  });

  return (
    <div className={sectionAboutClass}>
      <div className="title">{title}</div>
      <div className="content">{children}</div>
    </div>
  );
};

export default SectionAboutOfRecruiterCompany;
