import { FC } from 'react';
import { IIconEntity } from '../../types/entity/icon';

type CheckIconPropsType = IIconEntity;
const CheckIcon: FC<CheckIconPropsType> = ({ width = 10, height = 8 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 4.5L3.5 6.5L8.5 1.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export { CheckIcon };
