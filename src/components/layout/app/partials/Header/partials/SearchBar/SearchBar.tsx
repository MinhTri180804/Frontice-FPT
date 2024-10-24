import { Input } from "../../../../../../common";
import { SearchIcon } from "../../../../../../../assets/icons";
import "./SearchBar.scss"

const SearchBar: React.FC = () => {
    return (
        <div className="searchBar-container">
            <Input
                placeholder="Search"
                Icon={SearchIcon}
            />
        </div>
    );
};

export default SearchBar;