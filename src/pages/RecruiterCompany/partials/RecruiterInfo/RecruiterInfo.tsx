import { RecruiterModel } from './partials';
import './RecruiterInfo.scss';

const RecruiterInfo: React.FC = () => {
  return (
    <div className="recruiter-info-container">
      <div className="recruiter-info-models">
        <RecruiterModel />
        <RecruiterModel />
        <RecruiterModel />
        <RecruiterModel />
        <RecruiterModel />
        <RecruiterModel />
      </div>
    </div>
  );
};

export default RecruiterInfo;
