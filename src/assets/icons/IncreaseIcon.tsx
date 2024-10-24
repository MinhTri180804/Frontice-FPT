import { FC } from 'react';
import { IIconEntity } from '../../types/entity/icon';

type IncreaseIconPropsType = IIconEntity;
const IncreaseIcon: FC<IncreaseIconPropsType> = ({ width = 24, height = 24, stroke = "#1CBD74" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none">
            <path
                d="M2.91663 18L9.66663 11.25L13.9726 15.556C15.2175 13.1021 17.2711 11.1531 19.7866 10.038L22.5266 8.81799M22.5266 8.81799L16.5866 6.53699M22.5266 8.81799L20.2466 14.758"
                stroke={stroke}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
    );
};

export { IncreaseIcon };
