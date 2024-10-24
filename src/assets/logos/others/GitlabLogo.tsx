import { FC } from 'react';
import { IIconEntity } from '../../../types/entity/icon';

type GitlabLogoPropsType = IIconEntity;

const GitlabLogo: FC<GitlabLogoPropsType> = ({ width = 24, height = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      width={`${width}px`}
      height={`${height}px`}
    >
      <path fill="#e53935" d="M24 43L16 20 32 20z" />
      <path fill="#ff7043" d="M24 43L42 20 32 20z" />
      <path fill="#e53935" d="M37 5L42 20 32 20z" />
      <path fill="#ffa726" d="M24 43L42 20 45 28z" />
      <path fill="#ff7043" d="M24 43L6 20 16 20z" />
      <path fill="#e53935" d="M11 5L6 20 16 20z" />
      <path fill="#ffa726" d="M24 43L6 20 3 28z" />
    </svg>
  );
};

export default GitlabLogo;
