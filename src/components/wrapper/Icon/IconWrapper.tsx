import './iconWrapper.scss';
import { FC, ReactNode } from 'react';

interface IIconWrapperProps {
  children: ReactNode;
}

const IconWrapper: FC<IIconWrapperProps> = ({ children }) => {
  return <div className="icon-wrapper">{children}</div>;
};

export default IconWrapper;
