import { FC } from 'react';
import { IIconEntity } from '../../types/entity/icon';

type DownIconPropsType = IIconEntity;
const DownIcon: FC<DownIconPropsType> = ({ width = 10, height = 8 }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none">
            <path
                stroke="#000"
                stroke-width="1.5"
                fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
    );
};

export { DownIcon };
