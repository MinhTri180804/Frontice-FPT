import { FC } from 'react';
import { IIconEntity } from '../../types/entity/icon';

type PlusIconPropsType = IIconEntity;
const PlusIcon: FC<PlusIconPropsType> = ({ width = 16, height = 16, stroke = "#FFF" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none">
            <path
                d="M8 3.33447V12.6678"
                stroke={stroke}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round" />
            <path
                d="M3.33203 8.00098H12.6654"
                stroke={stroke}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
    );
};

export { PlusIcon };
