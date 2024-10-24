import { ChallengeOverview, FAQ, Section } from '../../components/common';
import './challengeDetails.scss';
import { FC, useState } from 'react';
import {
  ChallengeDetailsDownload,
  ChallengeDetailsInformation,
  ChallengeDetailsSolution,
} from './Partials';

const ChallengeDetailsPage: FC = () => {
  const [tabActive, setTabActive] = useState<number>(1);
  const changeTabActive = (tabId: number) => {
    setTabActive(tabId);
  };
  return (
    <div className="challenge__details-page">
      <div className="title">Challenge details</div>
      <div className="content">
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

        <section className="tab__content-wrapper">
          <ul className="tab__list">
            <li
              onClick={() => changeTabActive(1)}
              className={`item ${tabActive === 1 && 'active'} `}
            >
              Information
            </li>
            <li
              onClick={() => changeTabActive(2)}
              className={`item ${tabActive === 2 && 'active'} `}
            >
              Download assets
            </li>
            <li
              onClick={() => changeTabActive(3)}
              className={`item ${tabActive === 3 && 'active'} `}
            >
              Solution
            </li>
          </ul>

          <div className="content__of-tab">
            {tabActive === 1 && <ChallengeDetailsInformation />}
            {tabActive === 2 && <ChallengeDetailsDownload />}
            {tabActive === 3 && <ChallengeDetailsSolution />}
          </div>
        </section>

        <Section
          title="Challenge FAQS"
          titlePosition="center"
          className="faq__challenge-section"
        >
          <div className="list">
            <FAQ
              title="How do i submit my solution ?"
              description="We recommend reading our complete guide to submitting solutions . If you get stuck and need help, please feel free to ask questions in our Discord server, and we will help you submit your project."
            />
            <FAQ
              title="How do i submit my solution ?"
              description="We recommend reading our complete guide to submitting solutions . If you get stuck and need help, please feel free to ask questions in our Discord server, and we will help you submit your project."
            />
            <FAQ
              title="How do i submit my solution ?"
              description="We recommend reading our complete guide to submitting solutions . If you get stuck and need help, please feel free to ask questions in our Discord server, and we will help you submit your project."
            />
            <FAQ
              title="How do i submit my solution ?"
              description="We recommend reading our complete guide to submitting solutions . If you get stuck and need help, please feel free to ask questions in our Discord server, and we will help you submit your project."
            />
          </div>
        </Section>
        <section className="faq__challenge"></section>
      </div>
    </div>
  );
};

export default ChallengeDetailsPage;
