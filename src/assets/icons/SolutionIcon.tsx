import { FC } from 'react';
import { IIconEntity } from '../../types/entity/icon';

type SolutionIconPropsType = IIconEntity;
const SolutionIcon: FC<SolutionIconPropsType> = ({ width = 10, height = 8, stroke = "#A4A5A6" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none">
            <path d="M6.75 7.5L9.75 9.75L6.75 12M11.25 12H14.25M5.25 20.25H18.75C19.3467 20.25 19.919 20.0129 20.341 19.591C20.7629 19.169 21 18.5967 21 18V6C21 5.40326 20.7629 4.83097 20.341 4.40901C19.919 3.98705 19.3467 3.75 18.75 3.75H5.25C4.65326 3.75 4.08097 3.98705 3.65901 4.40901C3.23705 4.83097 3 5.40326 3 6V18C3 18.5967 3.23705 19.169 3.65901 19.591C4.08097 20.0129 4.65326 20.25 5.25 20.25Z"
                stroke={stroke}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
    );
};

export { SolutionIcon };
