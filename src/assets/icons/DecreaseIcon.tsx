import { FC } from 'react';
import { IIconEntity } from '../../types/entity/icon';

type DecreaseIconPropsType = IIconEntity;
const DecreaseIcon: FC<DecreaseIconPropsType> = ({ width = 24, height = 24, stroke = "#EA5B33" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none">
            <path
                d="M2.91663 6L9.66663 12.75L13.9526 8.464C16.0615 10.0703 17.5764 12.3323 18.2586 14.894L19.0346 17.792M19.0346 17.792L22.2166 12.281M19.0346 17.792L13.5236 14.61"
                stroke={stroke}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
    );
};

export { DecreaseIcon };
