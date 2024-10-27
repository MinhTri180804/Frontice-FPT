import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { Button, Challenge, Section } from '../../components/common';
import './homePage.scss';
import { HeroChallenge, HeroPremium, HeroSolution } from './Partials';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../constant';
import { useQuery } from '@tanstack/react-query';
import challengeService from '../../services/challengeService';
import { ChallengeSkeleton } from '../../components/skeleton';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isPending: pendingOfChallenges, data: challengesData } = useQuery({
    queryKey: [paths.QUERY_KEY.challenges],
    queryFn: async () => {
      const response = await challengeService.getAll({ page: 1 });
      const responseData = response.data.data.challenges;
      return responseData;
    },
  });

  const handleButtonViewMoreChallenge = () => {
    navigate(paths.challenges);
  };

  return (
    <div className="home__page-container">
      <h1 className="title__page">Home Page</h1>

      <div className="content">
        <div className="heros">
          <div className="hero__premium">
            <HeroPremium />
          </div>
          <div className="hero__challenge">
            <HeroChallenge />
          </div>
          <div className="hero__solution">
            <HeroSolution />
          </div>
        </div>

        <Section
          className="challenge__system"
          title="Challenge System"
          iconPosition="left"
          Icon={() => <AcademicCapIcon width={32} height={32} />}
        >
          {pendingOfChallenges &&
            Array.from({ length: 10 }).map((_, index) => (
              <ChallengeSkeleton key={`${index}`} />
            ))}
          {!pendingOfChallenges &&
            challengesData &&
            challengesData?.map((challenge, index) => (
              <Challenge challengeData={challenge} key={`${index}`} />
            ))}
          <Button
            styleType="secondary"
            buttonSize="normal"
            label="View More"
            className="button__view-more"
            onClick={handleButtonViewMoreChallenge}
          />
        </Section>

        {/* <Section
          className="challenge__recruiter"
          title="Challenge Recruiter"
          iconPosition="left"
          Icon={() => <AcademicCapIcon width={32} height={32} />}
        >
          {Array.from({ length: 7 }).map((_, index) => (
            <Challenge
              key={`${index}`}
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
          <Button
            styleType="secondary"
            buttonSize="normal"
            label="View More"
            className="button__view-more"
            onClick={handleButtonViewMoreChallenge}
          />
        </Section> */}
      </div>
    </div>
  );
};

export default Home;
