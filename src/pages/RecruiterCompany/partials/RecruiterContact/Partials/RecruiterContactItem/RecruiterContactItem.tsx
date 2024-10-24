import classNames from 'classnames';
import './recruiterContactItem.scss';
import { FC, HTMLProps } from 'react';

interface IRecruiterContactItemProps extends HTMLProps<HTMLDivElement> {
  contactLabel: string;
  contactValue: {
    content?: string;
    blank?: boolean;
    to?: string;
  };
}

const RecruiterContactItem: FC<IRecruiterContactItemProps> = ({
  contactLabel,
  contactValue = {},
  className,
  ...props
}) => {
  const { content = 'content', blank = false, to = '#' } = contactValue;

  const recruiterContactItemClass = classNames(
    className,
    'recruiter__contact-item',
  );

  return (
    <div className={recruiterContactItemClass} {...props}>
      <div className="contact-label">
        <span>{contactLabel}</span>
      </div>
      <div className="contact-value">
        <a
          href={to}
          target={blank ? '_blank' : '_parent'}
          rel="noopener noreferrer"
        >
          {content}
        </a>
      </div>
    </div>
  );
};

export default RecruiterContactItem;
