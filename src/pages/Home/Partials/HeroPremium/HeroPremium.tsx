import { pricingPlans } from '../../../../assets/images';
import { Button } from '../../../../components/common';
import './heroPremium.scss';
import { FC } from 'react';

const HeroPremium: FC = () => {
  return (
    <div className="hero__premium-component">
      <div className="image">
        <img src={pricingPlans} alt="" />
      </div>
      <div className="actions">
        <Button
          buttonSize="normal"
          styleType="secondary"
          label="Unlock Premium"
        />
      </div>
    </div>
  );
};

export default HeroPremium;
