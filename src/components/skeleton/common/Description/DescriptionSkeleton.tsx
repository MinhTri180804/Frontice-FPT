import { FC } from 'react';
import './descriptionSkeleton.scss';

const DescriptionSkeleton: FC = () => {
  return (
    <div className="description__skeleton">
      <div className="line">
        <div></div>
        <div></div>
      </div>
      <div className="line">
        <div></div>
        <div></div>
      </div>
      <div className="line">
        <div></div>
        <div></div>
      </div>
      <div className="line">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default DescriptionSkeleton;
