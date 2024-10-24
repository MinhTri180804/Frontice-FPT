import './challengeDetailsSolution.scss';
import { FC } from 'react';
import { SolutionOverview } from './Partials';
import { Button, Section } from '../../../../components/common';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Solution from '../../../../components/common/Solution';

const ChallengeDetailsSolution: FC = () => {
  return (
    <div className="challenge__details-solution-tab">
      <Section className="overview__solution">
        <SolutionOverview
          className="solution__overview"
          solutionData={{
            timeSubmit: '1 hour ago',
            technicalList: ['html', 'css', 'javascript'],
            name: 'Bento grid',
            score: 128,
            level: 'diamond',
            difficulty: 'Hight',
            like: 12,
            comment: '1k',
            dislike: 5,
            imageUrl:
              'https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/tvfhkjoksej6aohdaaci.jpg',
            contentDescription: [
              {
                title:
                  'What are you most proud of, and what would you do differently next time?',
                description:
                  'Im excited to share my first independently developed project — a fully functional and responsive Contact Us form built with React.js for the frontend, styled with Tailwind CSS, and thoroughly tested using Vitest, React Testing Library, and Jest DOM.',
              },
              {
                title:
                  'What are you most proud of, and what would you do differently next time?',
                description:
                  'Im excited to share my first independently developed project — a fully functional and responsive Contact Us form built with React.js for the frontend, styled with Tailwind CSS, and thoroughly tested using Vitest, React Testing Library, and Jest DOM.',
              },
            ],
          }}
        />

        <div className="actions">
          <Button
            className="view__details-solution"
            label="View details"
            iconPosition="right"
            Icon={() => <ArrowRightIcon width={24} height={24} color="white" />}
            buttonSize="large"
            styleType="primary"
          />

          <Button
            className="update-solution"
            label="Update Solution"
            iconPosition="right"
            Icon={() => <ArrowRightIcon width={24} height={24} />}
            buttonSize="large"
            styleType="secondary"
          />
        </div>
      </Section>
      <Section title="Community solution" className="community__solution">
        <div className="solution__list">
          {Array.from({
            length: 8,
          }).map(() => (
            <Solution
              image="https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/dmfvghaamqjt9lrx43ql.jpg"
              time="About 5 hours ago"
              name="Contact form"
              tech={['Html', 'css', 'javascript']}
            />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default ChallengeDetailsSolution;
