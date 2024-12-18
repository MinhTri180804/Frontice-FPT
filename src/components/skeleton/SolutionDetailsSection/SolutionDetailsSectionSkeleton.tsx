import './solutionDetailsSection.scss'
import { FC } from 'react';

const SolutionDetailsSectionSekeleton: FC = () => {
  return (
    <div className="skeleton__solution-details-section">
      <div className="actions">
        <div></div>
        <div></div>
      </div>

      <div className="content">
        <div className="solution__details-content"></div>
        <div className="author__of-solution"></div>
      </div>
    </div>
  );
};

export default SolutionDetailsSectionSekeleton
