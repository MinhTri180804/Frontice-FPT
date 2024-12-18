import { FC } from 'react';
import { axiosClient } from '../../axios';
import './pracing.scss';
import { useQuery } from '@tanstack/react-query';
import authService from '../../services/authServices';
import { ConditionWrapper } from '../../components/wrapper';
import { useTranslation } from 'react-i18next';
import { formatCurrencyVND } from '../../utils/helper';

const Pracing: FC = () => {
  const { t } = useTranslation();
  const { isFetching, data } = useQuery({
    queryKey: ['pracing'],
    queryFn: async () => {
      try {
        const response = await authService.paracing();
        const responseData = response.data.services[0];
        return responseData;
      } catch (error) {
        console.log('error: ', error);
      }
    },
  });

  const handleUpdatePremium = async (id: string) => {
    // TODO: implement handle register premium for account
    try {
      const data = {
        service_id: id,
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
    <div className="background">
      <div className="container">
        <div className="panel pricing-table">
          <div className="pricing-plan">
            <img
              src="https://s22.postimg.cc/8mv5gn7w1/paper-plane.png"
              alt=""
              className="pricing-img"
            />
            <h2 className="pricing-header">{t('VV')}</h2>
            <ul className="pricing-features">
              <li
                className="pricing-features-item"
                style={{ textDecoration: 'line-through', color: 'gray' }}
              >
                Tham gia các thử thách premium
              </li>
              <li
                className="pricing-features-item"
                style={{ textDecoration: 'line-through', color: 'gray' }}
              >
                Được góp ý bởi mentor
              </li>
            </ul>
            <span className="pricing-price">Free</span>
          </div>

          <ConditionWrapper condition={!isFetching}>
            {data?.slice(0, 2).map((item, index) => (
              <div className="pricing-plan" key={index}>
                <img
                  src="https://s22.postimg.cc/8mv5gn7w1/paper-plane.png"
                  alt=""
                  className="pricing-img"
                />
                <h2 className="pricing-header">{item.name}</h2>
                <ul className="pricing-features">
                  <li className="pricing-features-item">
                    Tham gia các thử thách premium
                  </li>
                  <li className="pricing-features-item">
                    Được góp ý bởi mentor
                  </li>
                </ul>
                <span className="pricing-price" style={{ fontSize: '20px' }}>
                  {formatCurrencyVND(item.price)} VNĐ
                </span>
                <button
                  className="pricing-button is-featured"
                  onClick={() => handleUpdatePremium(item.id)}
                >
                  {t('RegisterPracing')}
                </button>
              </div>
            ))}
          </ConditionWrapper>
        </div>
        <div className="panel pricing-table">
          {data?.slice(2).map((item, index) => (
            <div className="pricing-plan" key={index}>
              <img
                src="https://s22.postimg.cc/8mv5gn7w1/paper-plane.png"
                alt=""
                className="pricing-img"
              />
              <h2 className="pricing-header">{item.name}</h2>
              <ul className="pricing-features">
                <li className="pricing-features-item">
                  Tham gia các thử thách premium
                </li>
                <li className="pricing-features-item">Được góp ý bởi mentor</li>
              </ul>
              <span className="pricing-price" style={{ fontSize: '20px' }}>
                {formatCurrencyVND(item.price)} VNĐ
              </span>
              <button
                className="pricing-button is-featured"
                onClick={() => handleUpdatePremium(item.id)}
              >
                {t('RegisterPracing')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pracing;
