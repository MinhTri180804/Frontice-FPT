import './commentSkeleton.scss';
import { FC } from 'react';

const CommentSkeleton: FC = () => {
  return (
    <div className="comment__skeleton">
      <div className="author">
        <div className="avatar"></div>
        <div className="name"></div>
        <div className="commentAt"></div>
      </div>
      <div className="comment"></div>
    </div>
  );
};

export default CommentSkeleton;
