import './Header.scss';
import { SearchBar, UserProfile } from './partials';

const Header: React.FC = () => {
  return (
    <div className="header-container">
      <SearchBar />
      <UserProfile />
    </div>
  );
};

export default Header;
