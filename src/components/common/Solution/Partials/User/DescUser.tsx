interface User {
  userAvatar: string;
  userName: string;
  userId: string;
}
import './DescUser.scss';
const DescUser: React.FC<User> = ({ ...props }) => {
  const { userName, userId } = props;

  const avatarDefault =
    'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';
  return (
    <>
      <div className="desc-user">
        <div className="avatar-user">
          <img src={avatarDefault} alt="avatar user" />
        </div>
        <div className="name-rank-id">
          <div className="name-rank">
            <div className="name-user">{userName}</div>
          </div>
          <div className="id-user">{userId}</div>
        </div>
      </div>
    </>
  );
};
export default DescUser;
