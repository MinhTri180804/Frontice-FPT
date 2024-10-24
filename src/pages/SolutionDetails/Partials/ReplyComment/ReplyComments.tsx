import './ReplyComments.scss';
import avatarAuthor from '../../../../asset/images/avatar.png';
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
const ReplyComment: React.FC = () => {
  return (
    <div className="container-reply-comment">
      <div className="info-author">
        <div className="avatar-author">
          <img src={avatarAuthor} alt="Author avatar" />
        </div>
        <div className="name-author">Nguyen Minh Tri</div>
        <div className="date-comment">Date: 2022-01-01</div>
      </div>
      <div className="content-comment">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          aliquid ipsa praesentium at, illo aspernatur facere pariatur iusto,
          ipsam sapiente quas eveniet tempore, nam similique. Deserunt
          repudiandae sed suscipit eum?
        </p>
        <div className="interaction-panel">
          <div className="action-like">
            <HandThumbUpIcon />
            <p>12k</p>
          </div>
          <div className="action-dislike">
            <HandThumbDownIcon />
            <p>12k</p>
          </div>
          <div className="action-comment">
            <ChatBubbleLeftEllipsisIcon />
            <p>12k</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReplyComment;
