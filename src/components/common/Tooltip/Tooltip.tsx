import React from 'react';
import './Tooltip.scss';

interface TooltipProps {
  text: string;
  isVisible: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ text, isVisible }) => {
  return (
    <div className={`tooltip-container ${isVisible ? 'visible' : ''}`}>
      <span>{text}</span>
    </div>
  );
};

export default Tooltip;
