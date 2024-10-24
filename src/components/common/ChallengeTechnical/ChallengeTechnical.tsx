import './challengeTechnical.scss';
import { FC } from 'react';

interface IChallengeTechnicalProps {
  technicalValue: string;
}

const ChallengeTechnical: FC<IChallengeTechnicalProps> = ({
  technicalValue,
}) => {
  return (
    <div className="challenge__technical-component">
      <div className="value">{technicalValue}</div>
    </div>
  );
};

export default ChallengeTechnical;
