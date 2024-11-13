import classNames from 'classnames';
import './loading.scss';
import { FC, HTMLProps } from 'react';

type ILoadingProps = HTMLProps<HTMLDivElement>;

const Loading: FC<ILoadingProps> = (props) => {
  const { className, ...rest } = props;
  const loadingClass = classNames('lds-ring', className);
  return (
    <div className={loadingClass} {...rest}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loading;
