import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { pricingPlans } from '../../../../assets/images';
import { Button } from '../../../../components/common';
import { paths } from '../../../../constant';
import { useAuthStore } from '../../../../store/authStore';
import './heroPremium.scss';

const HeroPremium: FC = () => {
  const { t } = useTranslation();
  const { isAuthentication, profile } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="hero__premium-component">
      <div className="image">
        <img src={pricingPlans} alt="" />
      </div>
      <div className="actions">
        {isAuthentication && profile?.gold_account === false && (
          <Button
            buttonSize="normal"
            styleType="secondary"
            label={t('Button.UnlockPremium')}
            onClick={() => navigate(paths.parcing)}
          />
        )}

        {isAuthentication && profile?.gold_account === true && (
          <Button
            buttonSize="normal"
            styleType="primary"
            label={t('Account.Update.Premium.Success')}
          />
        )}
      </div>
    </div>
  );
};

export default HeroPremium;
