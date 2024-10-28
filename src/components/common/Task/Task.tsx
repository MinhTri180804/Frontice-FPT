import { FC } from 'react';
import Button from '../Button';
import './task.scss';
// import TagChallenge from '../TagChallenge';
import { ITaskEntity } from '../../../types/entity/task';
import ChallengeLevelDifficulty from '../ChallengeLevelDifficulty';
import ChallengeTechnical from '../ChallengeTechnical';
import TagChallenge from '../TagChallenge';

interface IChallengeProps {
  taskData: Omit<
    ITaskEntity,
    'isJoin' | 'isSubmit' | 'solutionSubmitId' | 'submittedTotal' | 'joinTotal'
  >;
}

const Task: FC<IChallengeProps> = ({ taskData }) => {
  // const navigate = useNavigate();

  const handleClickViewDetails = () => {
    // navigate(`${paths.solutionDetails}/${taskData.id}`);
  };

  return (
    <div className="task__component-container">
      <div className="banner">
        <img src={taskData.image} alt="" />
        <div className="tag__challenge-list">
          <TagChallenge type={'task'} />
          <TagChallenge type={'new'} />
        </div>
      </div>

      <div className="content">
        <div className="heading">
          <div className="heading-name">{taskData.title}</div>
          <div className="heading-technical">
            {taskData.technical.map((technical, index) => (
              <ChallengeTechnical
                technicalValue={technical}
                key={`${technical}-${index}`}
              />
            ))}
          </div>
        </div>

        <div className="overview">
          <ChallengeLevelDifficulty
            level={'taskee'}
            difficulty={taskData.requiredPoint}
          />
        </div>

        <div className="description">
          <span>{taskData.shortDes}</span>
        </div>
      </div>

      <Button
        onClick={handleClickViewDetails}
        label="View Details"
        buttonSize="small"
        styleType="secondary"
      />
    </div>
  );
};

export default Task;
