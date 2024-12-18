import './errorTemplate.scss';
import classNames from 'classnames';
import { FC, HTMLProps, ReactNode } from 'react';
import { ConditionWrapper } from '../../wrapper';

interface IErrorTemplateProps extends HTMLProps<HTMLDivElement> {
  imageError: string;
  errorText: string;
  title: string;
  description: string;
  actions?: () => ReactNode;
  imageErrorAlt?: string;
}

const ErrorTemplate: FC<IErrorTemplateProps> = ({
  imageError,
  imageErrorAlt,
  errorText,
  title,
  description,
  actions = null,
  className,
}) => {
  const errorTemplateClass = classNames('error__template', className);
  return (
    <div className={errorTemplateClass}>
      <div className="image__error">
        <img src={imageError} alt={imageErrorAlt} />
      </div>

      <div className="about">
        <div className="name_error">{errorText}</div>
        <div className="information__error">
          <div className="title">{title}</div>
          <div className="description">{description}</div>
        </div>
        <ConditionWrapper condition={actions !== null}>
          <div className="actions">{actions && actions()}</div>
        </ConditionWrapper>
      </div>
    </div>
  );
};

export default ErrorTemplate;
