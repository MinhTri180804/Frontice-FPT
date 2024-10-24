import { FC } from 'react';
import { IIconEntity } from '../../types/entity/icon';

type WarningIconPropsType = IIconEntity;

const WarningIcon: FC<WarningIconPropsType> = ({ width = 2, height = 10 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1V6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="1" cy="9" r="1" fill="white" />
    </svg>
  );
};

export { WarningIcon };
