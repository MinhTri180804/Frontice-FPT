import './RecruiterProfile.scss';
import { RecruiterLogo } from '../../../../assets/images';
import {
  MapPinIcon,
  ClipboardDocumentListIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../../../../components/common';

const RecruiterProfile: React.FC = () => {
  return (
    <div className="recruiter-profile-container">
      <img className="left-content" src={RecruiterLogo} alt="recruiter-logo" />
      <div className="right-content">
        <div className="recruiter-profile-info">
          <div className="recruiter-name">NAB Innovation Centre Vietnam</div>
          <div className="recruiter-detail">
            <div className="recruiter-address">
              <MapPinIcon width={24} height={24} stroke="#fff" />
              <span>Thành phố Hồ Chí Minh, Việt Nam</span>
            </div>
            <div className="recruiter-challenge-numbers">
              <ClipboardDocumentListIcon width={24} height={24} stroke="#fff" />
              <span>Có 11 challenge</span>
            </div>
          </div>
        </div>
        <div className="recruiter-btn-container">
          <Button
            label="Go to challenges"
            styleType="secondary"
            buttonSize="medium"
            className="custom-color"
          />
          <Button
            label="Theo dõi"
            styleType="primary"
            buttonSize="medium"
            Icon={PlusIcon}
            iconPosition="left"
          />
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;
