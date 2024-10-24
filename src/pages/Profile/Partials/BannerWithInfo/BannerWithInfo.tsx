import './BannerWithInfo.scss';
import Banner from '../../../../asset/images/banner.png';
import Avatar from '../../../../asset/images/avatar.png';
import { Button } from '../../../../components/common';
import { PlusIcon, EnvelopeIcon, LinkIcon } from '@heroicons/react/24/outline';

const BannerWithInfo: React.FC = () => {
  return (
    <div className="banner-with-info">
      <figure className="banner">
        <img src={Banner} alt="banner" />
      </figure>
      <figure className="user">
        <div className="avatar">
          <img src={Avatar} alt="avatar" />
        </div>

        <figcaption>
          <div className="user-header">
            <div className="user-name">
              <h1>Ngo Thanh Y -Diamond rank </h1>
              <h2>@ycute</h2>
            </div>
            <div className="action">
              <Button
                styleType="secondary"
                label="View CV"
                iconPosition="left"
                buttonSize="small"
                Icon={() => <PlusIcon />}
              />
              <Button
                styleType="primary"
                label="Follow"
                iconPosition="right"
                buttonSize="small"
                Icon={() => <PlusIcon />}
              />
            </div>
          </div>
          <div className="user-info">
            <div className="container-contact">
              <div className="contact">
                <div className="icon">
                  <EnvelopeIcon />
                </div>
                <p className="mail">nguyenminhtri1808t@gmail.com</p>
              </div>
              <div className="contact">
                <div className="icon">
                  <EnvelopeIcon />
                </div>
                <p className="mail">nguyenminhtri1808t@gmail.com</p>
              </div>
              <div className="contact">
                <div className="icon">
                  <EnvelopeIcon />
                </div>
                <p className="mail">nguyenminhtri1808t@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="user-info-icon">
            <div className="icon">
              <LinkIcon />
            </div>
            <div className="icon">
              <LinkIcon />
            </div>
            <div className="icon">
              <LinkIcon />
            </div>
            <div className="icon">
              <LinkIcon />
            </div>
          </div>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            odit, veniam quas sit blanditiis illo veritatis adipisci odio
            recusandae perferendis modi dolor sint commodi in cupiditate at
            nostrum error quae?
          </p>
        </figcaption>
      </figure>
    </div>
  );
};

export default BannerWithInfo;
