import { ChallengeTechnical } from '../../../../components/common';
import Action from '../Action';
import { QuestionAnswer } from './Partials';
import SectionAuthorInformation from './Partials/SectionAuthorInformation/SectionAuthorInformation';
import './SolutionDetails.scss';
import ActionsOfSolution from './Partials/ActionsOfSolution/ActionsOfSolution';
import { ISolutionDetailsResponse } from '../../../../types/response/solution';
import { convertTimestampToVietnamTime } from '../../../../utils/convertTime';
import { useTranslation } from 'react-i18next';

interface ISolutionDetailsProps {
  solutionDetailsData: ISolutionDetailsResponse;
}
const SolutionDetails: React.FC<ISolutionDetailsProps> = ({
  solutionDetailsData,
}) => {
  const { t } = useTranslation();
  const timeSubmitFormat = convertTimestampToVietnamTime(
    solutionDetailsData?.submitedAt,
  );
  return (
    <>
      <Action
        urlGithub={solutionDetailsData?.github as string}
        urlLiveGithub={solutionDetailsData?.liveGithub as string}
      />

      <div className="container-solution-details">
        <div className="summary-component">
          <div className="header">
            <p>
              {t('SubmittedAbout')} {timeSubmitFormat}
            </p>
            <h1>{solutionDetailsData?.title}</h1>
            <div className="tech">
              {solutionDetailsData?.challenge.technical.map(
                (technical, index) => (
                  <ChallengeTechnical
                    technicalValue={technical}
                    key={`${index}`}
                  />
                ),
              )}
            </div>
          </div>

          <div className="interaction-buttons">
            <ActionsOfSolution
              numberOfComment={solutionDetailsData?.comment as number}
              numberOfDislike={solutionDetailsData?.disliked as number}
              numberOfLike={solutionDetailsData?.liked as number}
              solutionId={solutionDetailsData?.id as string}
            />
          </div>

          <section className="questions__list">
            {solutionDetailsData?.description.map((questionAnswer, index) => (
              <QuestionAnswer
                key={`${index}`}
                questionAnswerData={questionAnswer}
              />
            ))}
          </section>
        </div>
        <SectionAuthorInformation
          className="author__information-section"
          username={solutionDetailsData?.taskee.username.split('/')[0] || ''}
        />
      </div>
    </>
  );
};
export default SolutionDetails;
