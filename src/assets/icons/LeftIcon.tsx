import { FC } from 'react';
import { IIconEntity } from '../../types/entity/icon';

type LeftIconPropsType = IIconEntity;
const LeftIcon: FC<LeftIconPropsType> = ({
  width = 10,
  height = 8,
  stroke = '#A4A5A6',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      <path
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  );
};

export { LeftIcon };
