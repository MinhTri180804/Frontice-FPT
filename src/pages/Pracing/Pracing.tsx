import { FC } from 'react';
import { axiosClient } from '../../axios';
import './pracing.scss';

const Pracing: FC = () => {
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
    <div className="background">
      <div className="container">
        <div className="panel pricing-table">
          <div className="pricing-plan">
            <img
              src="https://s22.postimg.cc/8mv5gn7w1/paper-plane.png"
              alt=""
              className="pricing-img"
            />
            <h2 className="pricing-header">No Time</h2>
            <ul className="pricing-features">
              <li className="pricing-features-item">Custom domains</li>
              <li className="pricing-features-item">
                Sleeps after 30 mins of inactivity
              </li>
            </ul>
            <span className="pricing-price">Free</span>
          </div>

          <div className="pricing-plan">
            <img
              src="https://s28.postimg.cc/ju5bnc3x9/plane.png"
              alt=""
              className="pricing-img"
            />
            <h2 className="pricing-header">6 Months</h2>
            <ul className="pricing-features">
              <li className="pricing-features-item">Never sleeps</li>
              <li className="pricing-features-item">
                Multiple workers for more powerful apps
              </li>
            </ul>
            <span className="pricing-price">$150</span>
            <button
              className="pricing-button is-featured"
              onClick={handleUpdatePremium}
            >
              Update
            </button>
          </div>

          <div className="pricing-plan">
            <img
              src="https://s21.postimg.cc/tpm0cge4n/space-ship.png"
              alt=""
              className="pricing-img"
            />
            <h2 className="pricing-header">1 Year</h2>
            <ul className="pricing-features">
              <li className="pricing-features-item">Dedicated</li>
              <li className="pricing-features-item">
                Simple horizontal scalability
              </li>
            </ul>
            <span className="pricing-price">$400</span>
            <button className="pricing-button" onClick={handleUpdatePremium}>
              update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pracing;
