interface User {
  userAvatar: string;
  userName: string;
  userRank: string;
  userId: string;
}
import './DescUser.scss';
const DescUser: React.FC<User> = ({ ...props }) => {
  const { userAvatar, userName, userRank, userId } = props;
  return (
    <>
      <div className="desc-user">
        <div className="avatar-user">
          <img src={userAvatar} alt="avatar user" />
        </div>
        <div className="name-rank-id">
          <div className="name-rank">
            <div className="name-user">{userName}</div>
            <div className="rank-user">{userRank}</div>
          </div>
          <div className="id-user">{userId}</div>
        </div>
      </div>
    </>
  );
};
export default DescUser;
