import './stepProcess.scss';
import { FC } from 'react';
import classNames from 'classnames';

interface IStepProcessProps {
  stepNumber: string | number;
  stepContent: string;
  isActive: boolean;
  eventClick?: () => void;
}

const StepProcess: FC<IStepProcessProps> = ({
  stepContent,
  stepNumber,
  isActive,
  eventClick = () => {},
}) => {
  // Define className condition for component
  const stepProcessClass = classNames({
    'step__process-component': true,
    active: isActive,
  });

  const handleClick: () => void = () => {
    eventClick();
  };

  return (
    <div className={stepProcessClass} onClick={handleClick}>
      <div className="step-number">{stepNumber}</div>
      <div className="step-content">{stepContent}</div>
    </div>
  );
};

export default StepProcess;
