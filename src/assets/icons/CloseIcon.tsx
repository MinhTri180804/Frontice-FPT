import { FC } from 'react';
import { IIconEntity } from '../../types/entity/icon';

type CloseIconPropsType = IIconEntity;

const CloseIcon: FC<CloseIconPropsType> = ({ width = 8, height = 8 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 8 8`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.99998 1.00002L1 7M0.999975 1L6.99995 6.99998"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export { CloseIcon };
