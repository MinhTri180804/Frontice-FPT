import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { pricingPlans } from '../../../../assets/images';
import { axiosClient } from '../../../../axios';
import { Button } from '../../../../components/common';
import { useAuthStore } from '../../../../store/authStore';
import './heroPremium.scss';

const HeroPremium: FC = () => {
  const { t } = useTranslation();
  const { isAuthentication, profile } = useAuthStore();

  const handleUpdatePremium = async () => {
    // TODO: implement handle register premium for account
    try {
      const data = {
        service_id: 1,
        code: '',
      };
      const response = await axiosClient.post(
        `https://frontice-production-6245.up.railway.app/api/subscription/register`,
        data,
      );
      const url = response.data.url;
      window.open(url);
    } catch (error) {
      console.log(error);
    }
  };
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
            onClick={handleUpdatePremium}
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
