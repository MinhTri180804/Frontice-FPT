import { useLocation, useNavigate } from 'react-router-dom';
import { ChallengeOverview } from '../../components/common';
import { paths } from '../../constant';
import { SolutionDetailsSection } from './Partials';
import Feedback from './Partials/Feedback/Feedback';
import './SolutionDetailsPage.scss';
const SolutionDetails: React.FC = () => {
  const { state } = useLocation();
  const { challengeId } = state;
  const navigate = useNavigate();

  if (!challengeId) {
    navigate(paths.home);
  }

  return (
    <>
      <div className="container-solution-details-page">
        <div className="title">
          <h1>Solution Details</h1>
        </div>
        <ChallengeOverview challengeId={challengeId} />
        <SolutionDetailsSection />
        <Feedback />
      </div>
    </>
  );
};
export default SolutionDetails;
