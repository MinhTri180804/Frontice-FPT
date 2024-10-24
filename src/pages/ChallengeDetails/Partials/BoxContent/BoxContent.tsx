import classNames from 'classnames';
import './boxContent.scss';
import { FC, HTMLProps, ReactNode } from 'react';

interface IBoxContentProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  title: string;
}

const BoxContent: FC<IBoxContentProps> = ({
  children,
  title,
  className,
  ...props
}) => {
  const boxContentClass = classNames('box__content-component', className);
  return (
    <div {...props} className={boxContentClass}>
      <div className="title">{title}</div>
      <div className="content">{children}</div>
    </div>
  );
};

export default BoxContent;
