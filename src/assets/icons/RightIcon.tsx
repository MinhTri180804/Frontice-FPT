import { FC } from 'react';
import { IIconEntity } from '../../types/entity/icon';

type RightIconPropsType = IIconEntity;
const RightIcon: FC<RightIconPropsType> = ({ width = 10, height = 8, stroke = "#A4A5A6" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none">
            <path
                stroke={stroke}
                stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>

    );
};

export { RightIcon };
