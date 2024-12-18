import './taskOverview.scss';
import { FC } from 'react';
import { ITaskEntity } from '../../../types/entity/task';
import ChallengeLevelDifficulty from '../ChallengeLevelDifficulty';
import { ConditionMessage } from '../ChallengeOverview/Partials';
import ImagePreview from '../ChallengeOverview/Partials/ImagePreview/ImagePreview';
import ChallengeTechnical from '../ChallengeTechnical';
import TagChallenge from '../TagChallenge';
import ButtonConditionTaskOverview from './Partials/ButtonConditionTaskOverview/ButtonConditionTaskOverview';
import Button from '../Button';

interface ITaskOverviewProps {
  taskData: ITaskEntity;
  eventClick: () => void;
}
const TaskOverview: FC<ITaskOverviewProps> = ({ taskData, eventClick }) => {
  const handleReportTask = () => {
    console.log('report');
  };

  return (
    <div className="challenge__overview-component">
      <div className="challenge__about">
        <div className="heading">
          <div className="challenge__tag-list">
            <TagChallenge type="task" />
            <TagChallenge type="new" />
          </div>
          <div className="challenge__technical-properties">
            <div className="challenge__technical-list">
              {taskData?.technical?.map((technical, index) => (
                <ChallengeTechnical
                  key={`${technical}-${index}`}
                  technicalValue={technical}
                />
              ))}
            </div>
            <div className="challenge__properties">
              <ChallengeLevelDifficulty
                level={'taskee'}
                difficulty={taskData.requiredPoint}
              />
            </div>
          </div>
        </div>

        <div className="content">
          <div className="challenge__name">{taskData.title}</div>
          <div className="challenge__description">{taskData.shortDes}</div>
          <div className="challenge__statistic">
            <div className="people__participated">
              <div className="label">People Participated</div>
              <div className="value">{taskData.joinTotal}</div>
            </div>
            <div className="people__submit">
              <div className="label">People submit</div>
              <div className="value">{taskData.submittedTotal}</div>
            </div>
          </div>
        </div>

        <ConditionMessage
          enoughPoint={taskData.enoughPoint}
          challengePremium={false}
        />
        <div className="action">
          <ButtonConditionTaskOverview
            challengePremium={false}
            eventClick={eventClick}
            isJoin={taskData.isJoin}
            isSubmit={taskData.isSubmit}
            enoughPoint={taskData.enoughPoint}
            solutionSubmitId={taskData.solutionSubmitId}
            id={taskData.id}
          />
          <Button
            className="button-report"
            style={{ width: '30%', borderColor: 'red', color: 'red' }}
            styleType="secondary"
            buttonSize="medium"
            label="Report"
            onClick={handleReportTask}
          />
        </div>
      </div>
      <div className="challenge__preview">
        <ImagePreview imageURL={taskData.image} />
      </div>
    </div>
  );
};

export default TaskOverview;
