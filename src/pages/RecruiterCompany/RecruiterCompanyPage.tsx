import { Challenge } from '../../components/common';
import './RecruiterCompanyPage.scss';
import {
  RecruiterContact,
  RecruiterDescription,
  RecruiterInfo,
  RecruiterProfile,
  SectionAbout,
} from './partials';

const RecruiterCompanyPage: React.FC = () => {
  return (
    <div className="recruiter-company-container">
      <h1 className="recruiter-company-title">Recruiter Company</h1>
      <RecruiterProfile />
      <div className="recruiter-company-content">
        <div className="column left-column">
          <SectionAbout
            className="section__recruiter-info"
            title="Thông tin công ty"
            borderBottomHeading
          >
            <RecruiterInfo />
          </SectionAbout>

          <SectionAbout
            className="section__recruiter-description"
            title="Giới thiệu công ty"
            borderBottomHeading
          >
            <RecruiterDescription />
          </SectionAbout>
        </div>

        <div className="column right-column">
          <SectionAbout
            title="Thông tin liên hệ"
            className="section__recruiter-contact"
            borderBottomHeading
          >
            <RecruiterContact />
          </SectionAbout>
        </div>
      </div>
      <SectionAbout className="challenge__list" title="Danh sách thử thách">
        <div className="challenge__list-content">
          {Array.from({ length: 10 }).map(() => (
            <Challenge
              name="Frontend Quiz app"
              bannerUrl="https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/wcxhsnz3foidwbzshiia.jpg"
              description="This app will test your skills (as well as your knowledge!) as you build out a fully functional quiz. We provide a local JSON file to help you practice working with JSON!"
              level="Diamond"
              difficulty="High"
              technicalList={['html', 'css', 'javascript']}
              score={120}
              tags={[
                {
                  value: 'premium',
                },
                { value: 'new' },
              ]}
            />
          ))}
        </div>
      </SectionAbout>
    </div>
  );
};

export default RecruiterCompanyPage;
