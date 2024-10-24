import { ChallengeOverview } from '../../components/common';
import Action from './Partials/Action/Action';
import SolutitonDetails from './Partials/Details';
import Feedback from './Partials/Feedback/Feedback';
import './SolutionDetailsPage.scss';
const SolutionDetails: React.FC = () => {
  return (
    <>
      <div className="container-solution-details-page">
        <div className="title">
          <h1>Solution Details</h1>
        </div>
        <div className="overview-challenge">
          <ChallengeOverview
            name="Mortgage repayment calculator"
            description="This mortgage calculator is an excellent project for practicing working with forms, client-side validation, and updating the DOM. Remember to focus on accessibility, too!"
            score={125}
            peopleParticipated={12}
            peopleSubmit={22}
            technicalList={['html', 'scss', 'javascript']}
            level="Diamond"
            difficulty="High"
            optionsImagePreview={[
              {
                id: '1',
                imageUrl:
                  'https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/wcxhsnz3foidwbzshiia.jpg',
                label: 'desktop design',
              },
              {
                id: '2',
                imageUrl:
                  'https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/vfzss4cvrzrhmmu0odek.jpg',
                label: 'question design',
              },
              {
                id: '3',
                imageUrl:
                  'https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/r2vq1awkyyg2o9dj0gpm.jpg',
                label: 'tablet design',
              },
              {
                id: '4',
                imageUrl:
                  'https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/dlnm123cefx8pilktakc.jpg',
                label: 'mobile design',
              },
            ]}
          />
        </div>
        <Action />
        <SolutitonDetails />
        <Feedback />
      </div>
    </>
  );
};
export default SolutionDetails;
