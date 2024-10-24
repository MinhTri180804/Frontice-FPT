import { FC } from 'react';
import { IIconEntity } from '../../types/entity/icon';

type UpAndDownIconPropsType = IIconEntity;
const UpAndDownIcon: FC<UpAndDownIconPropsType> = ({
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
        d="M8.25 15.0004L12 18.7504L15.75 15.0004M8.25 9.00037L12 5.25037L15.75 9.00037"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export { UpAndDownIcon };
