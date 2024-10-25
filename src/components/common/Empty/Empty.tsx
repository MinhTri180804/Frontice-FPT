import { HTMLProps, ReactNode } from 'react';
import './Empty.scss';
interface EmptyProps extends HTMLProps<HTMLDivElement> {
  text: string;
  pathImg?: string;
  children?: ReactNode;
}
const EmptyComponent: React.FC<EmptyProps> = ({ ...props }) => {
  const { text, pathImg, children } = props;
  return (
    <div className="empty-container">
      <div className="empty-image">
        <img src={pathImg} alt="" />
      </div>
      <div className="empty-text">{text}</div>
      {children}
    </div>
  );
};
export default EmptyComponent;
