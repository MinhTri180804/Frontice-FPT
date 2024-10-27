import { useTranslation } from 'react-i18next';
import avatarAuthor from '../../../asset/images/avatar.png';
import Button from '../Button';
import './Comment.scss';
const IComment: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="container-comment">
        <div className="main-comment">
          <div className="image">
            <img src={avatarAuthor} alt="" />
          </div>
          <div className="input-text">
            <textarea
              placeholder={t('Placeholder.Comment')}
              name=""
              id=""
            ></textarea>
          </div>
        </div>
        <div className="action">
          <Button
            buttonSize="small"
            styleType="primary"
            label="Comment"
            className="fix-content"
          />
        </div>
      </div>
    </>
  );
};

export default IComment;
