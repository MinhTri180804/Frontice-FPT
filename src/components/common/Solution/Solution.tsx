import {
  ChatBubbleLeftEllipsisIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { DefaultAvatar } from '../../../assets/images';
import { paths } from '../../../constant';
import { ISolutionResponse } from '../../../types/response/solution';
import SolutionLevelDifficulty from '../SolutionLevelDifficulty';
import DescSolution from './Partials/Solutions';
import DescUser from './Partials/User';
import './Solution.scss';
import { useTranslation } from 'react-i18next';

interface ISolutionProps {
  solution: ISolutionResponse;
  isShowDescription?: boolean;
}
const Solution: React.FC<ISolutionProps> = ({
  solution,
  isShowDescription = false,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <div
        className="container-solution"
        onClick={() =>
          navigate(`${paths.solutionDetails}/${solution.id}`, {
            state: {
              challengeId: solution.challenge.id,
            },
          })
        }
      >
        <div className="solution">
          <div className="image">
            <img src={solution.challenge.image} alt="" />
          </div>
          <div className="desc-solution-item">
            <div className="time-solution">{solution.submitedAt}</div>
            <div className="name-solution">{solution.challenge.title}</div>
            <div className="tech-solution">
              {solution.challenge.technical.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="point-panel">
              <div className="score-solution">
                {solution.challenge.point} {t('Point')}
              </div>
              <div className="rank-level">
                <SolutionLevelDifficulty
                  level={solution.challenge.level}
                  difficulty={solution.challenge.requiredPoint}
                />
              </div>
            </div>
            {isShowDescription && (
              <DescUser
                userAvatar={solution.taskee.image || DefaultAvatar}
                userId={solution.taskee.username}
                userName={`${solution.taskee.firstname} ${solution.taskee.lastname}`}
              />
            )}

            <div className="list__desc">
              {isShowDescription &&
                solution.description.map((description, index) => (
                  <DescSolution
                    key={`${index}`}
                    titleSolution={description.title}
                    descriptionSolution={description.answer}
                  />
                ))}
            </div>
            <div className="interaction-panel">
              <div className="action-like">
                <HandThumbUpIcon />
                <p>{solution.liked}</p>
              </div>
              <div className="action-dislike">
                <HandThumbDownIcon />
                <p>{solution.disliked}</p>
              </div>
              <div className="action-comment">
                <ChatBubbleLeftEllipsisIcon />
                <p>{solution.comment}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Solution;
