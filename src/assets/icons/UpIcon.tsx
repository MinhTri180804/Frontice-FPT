import { FC } from 'react';
import { IIconEntity } from '../../types/entity/icon';

type UpIconPropsType = IIconEntity;
const UpIcon: FC<UpIconPropsType> = ({ width = 10, height = 8 }) => {
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
                fillRule="evenodd" d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z" clipRule="evenodd" />
        </svg>
    );
};

export { UpIcon };
