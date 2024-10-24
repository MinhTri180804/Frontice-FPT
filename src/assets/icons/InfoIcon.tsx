import { FC } from 'react';
import { IIconEntity } from '../../types/entity/icon';

type InfoIconPropsType = IIconEntity;

const InfoIcon: FC<InfoIconPropsType> = ({ width = 2, height = 10 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="1"
        cy="1"
        r="1"
        transform="matrix(1 0 0 -1 0 2)"
        fill="white"
      />
      <path d="M1 9V4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export { InfoIcon };
