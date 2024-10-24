import { FC } from 'react';
import { IIconEntity } from '../../types/entity/icon';

type HomeIconPropsType = IIconEntity;
const HomeIcon: FC<HomeIconPropsType> = ({ width = 10, height = 8, stroke = "#A4A5A6" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none">
            <path
                d="M2.25 12.0001L11.204 3.04507C11.644 2.60607 12.356 2.60607 12.795 3.04507L21.75 12.0001M4.5 9.75007V19.8751C4.5 20.4961 5.004 21.0001 5.625 21.0001H9.75V16.1251C9.75 15.5041 10.254 15.0001 10.875 15.0001H13.125C13.746 15.0001 14.25 15.5041 14.25 16.1251V21.0001H18.375C18.996 21.0001 19.5 20.4961 19.5 19.8751V9.75007M8.25 21.0001H16.5"
                stroke={stroke}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
    );
};

export { HomeIcon };
