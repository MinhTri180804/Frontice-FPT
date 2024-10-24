import Comment from '../Comments';
import './Feedback.scss';
import imgPath from '../../../../asset/images/avatar.png';
import IComment from '../../../../components/common/Comment';
const Feedback: React.FC = () => {
  const commentData = {
    nameAuthor: 'Ngo Thanh U',
    avatarAuthor: imgPath,
    date: '2024-10-15',
    content: 'This is a comment.',
    like: 10,
    dislike: 2,
    commentCount: 5,
    isReply: false,
    childrenComment: [
      {
        nameAuthor: 'Nguyen Minh Trri',
        avatarAuthor: 'path-to-avatar2.jpg',
        date: '2024-10-16',
        content: 'This is a reply.',
        like: 3,
        dislike: 0,
        commentCount: 0,
        isReply: false,
        childrenComment: [
          {
            nameAuthor: 'JThay 123',
            avatarAuthor: 'path-to-avatar2.jpg',
            date: '2024-10-16',
            content: 'This is a reply.',
            like: 3,
            dislike: 0,
            commentCount: 0,
            isReply: true,
          },
          {
            nameAuthor: 'Trn Thanh',
            avatarAuthor: 'path-to-avatar3.jpg',
            date: '2024-10-17',
            content: 'Another reply here.',
            like: 2,
            dislike: 1,
            commentCount: 1,
            isReply: true,
          },
        ],
      },
      {
        nameAuthor: 'Phuc chan',
        avatarAuthor: 'path-to-avatar3.jpg',
        date: '2024-10-17',
        content: 'Another reply here.',
        like: 2,
        dislike: 1,
        commentCount: 1,
        isReply: true,
      },
    ],
  };

  return (
    <>
      <div className="container-feedback">
        <div className="header">
          <h1>Feedback </h1>
          <div className="action">
            <div className="mentor">Mentor</div>
            <div className="other">Other</div>
          </div>
        </div>
        <div className="list-feedback">
          <div className="input-feedback">
            <div>Comment</div>
            <IComment />
          </div>
          <Comment data={commentData} />;
        </div>
      </div>
    </>
  );
};
export default Feedback;
