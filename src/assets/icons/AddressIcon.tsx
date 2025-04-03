import { FC } from 'react';
import { IIconEntity } from '../../types/entity/icon';

type AddressIconPropsType = IIconEntity;
const AddressIcon: FC<AddressIconPropsType> = ({
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
        d="M15 10.501C15 11.2966 14.6839 12.0597 14.1213 12.6223C13.5587 13.1849 12.7956 13.501 12 13.501C11.2044 13.501 10.4413 13.1849 9.87868 12.6223C9.31607 12.0597 9 11.2966 9 10.501C9 9.70533 9.31607 8.94226 9.87868 8.37966C10.4413 7.81705 11.2044 7.50098 12 7.50098C12.7956 7.50098 13.5587 7.81705 14.1213 8.37966C14.6839 8.94226 15 9.70533 15 10.501Z"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19.5 10.501C19.5 17.643 12 21.751 12 21.751C12 21.751 4.5 17.643 4.5 10.501C4.5 8.51185 5.29018 6.6042 6.6967 5.19768C8.10322 3.79115 10.0109 3.00098 12 3.00098C13.9891 3.00098 15.8968 3.79115 17.3033 5.19768C18.7098 6.6042 19.5 8.51185 19.5 10.501Z"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export { AddressIcon };
