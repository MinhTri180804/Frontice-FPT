import { HTMLProps, ReactNode } from 'react';
import './Empty.scss';
import classNames from 'classnames';
import { ConditionWrapper } from '../../wrapper';
interface EmptyProps extends HTMLProps<HTMLDivElement> {
  text?: string;
  pathImg?: string;
  children?: ReactNode;
}
const EmptyComponent: React.FC<EmptyProps> = ({ ...props }) => {
  const { text, pathImg, children, className } = props;
  const emptyComponentClass = classNames('empty-container', className);
  return (
    <div className={emptyComponentClass}>
      <div className="empty-image">
        <img src={pathImg} alt="" />
      </div>
      <ConditionWrapper condition={Boolean(text)}>
        <div className="empty-text">{text}</div>
      </ConditionWrapper>
      {children}
    </div>
  );
};
export default EmptyComponent;
