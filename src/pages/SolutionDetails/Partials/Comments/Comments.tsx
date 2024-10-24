import { useState } from 'react';
import './Comments.scss';
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import IComment from '../../../../components/common/Comment';

type BaseComment = {
  nameAuthor?: string;
  avatarAuthor?: string;
  date?: string;
  content?: string;
  like?: number;
  dislike?: number;
  commentCount?: number;
};

interface IComment extends BaseComment {
  childrenComment?: BaseComment[];
  parentCommentName?: string;
}

interface ICommentProps {
  data: IComment;
}

const Comment: React.FC<ICommentProps> = ({ data }) => {
  const [showSelfComment, setShowSelfComment] = useState<boolean>(false);
  const {
    nameAuthor = 'Incognito',
    avatarAuthor = '',
    date = '',
    content = '',
    like = 0,
    dislike = 0,
    commentCount = 0,
    parentCommentName,
    childrenComment = null,
  } = data;
  const handel = () => {
    setShowSelfComment(!showSelfComment);
  };
  return (
    <div className="container-comment">
      <div className="info-author">
        <div className="avatar-author">
          <img src={avatarAuthor || 'default-avatar.png'} alt="Author avatar" />
        </div>
        <div className="name-author">{nameAuthor}</div>
        <div className="date-comment">Date: {date}</div>
        {parentCommentName && (
          <div className="reply-to">
            Reply to: <p>{parentCommentName}</p>
          </div>
        )}
      </div>
      <div className="content-comment">
        <p>{content}</p>
        <div className="interaction-panel">
          <div className="action-like">
            <HandThumbUpIcon className="icon" />
            <p>{like}</p>
          </div>
          <div className="action-dislike">
            <HandThumbDownIcon className="icon" />
            <p>{dislike}</p>
          </div>
          <div className="action-comment" onClick={handel}>
            <ChatBubbleLeftEllipsisIcon className="icon" />
            <p>{commentCount}</p>
          </div>
        </div>
      </div>
      {showSelfComment && <IComment />}
      {childrenComment && (
        <div className="replies">
          {childrenComment.map((child, index) => (
            <Comment
              key={index}
              data={{ ...child, parentCommentName: nameAuthor }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
