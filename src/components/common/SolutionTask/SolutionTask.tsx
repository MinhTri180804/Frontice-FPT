import { FC } from 'react';
import { ISolutionTask as ISolutionTaskResponse } from '../../../types/response/task';
import { convertTimestampToVietnamTime } from '../../../utils/convertTime';
import { handleClickNewTab } from '../../../utils/helper';
import Button from '../Button';
import SolutionLevelDifficulty from '../SolutionLevelDifficulty';
import './solutionTask.scss';
import { useTranslation } from 'react-i18next';

interface ISolutionTask {
  solutionTaskData: ISolutionTaskResponse;
}

const SolutionTask: FC<ISolutionTask> = ({ solutionTaskData }) => {
  const { t } = useTranslation();
  const timeSubmited = convertTimestampToVietnamTime(
    Number(solutionTaskData?.submitedAt),
  );
  return (
    <>
      <div className="container-solution">
        <div className="solution">
          <div className="image">
            <img src={solutionTaskData.task.image} alt="" />
          </div>
          <div className="about">
            <div className="desc-solution-item">
              <div className="time-solution">{timeSubmited}</div>
              <div className="name-solution">{solutionTaskData.task.title}</div>
              <div className="tech-solution">
                {solutionTaskData.task.technical.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="point-panel">
                <div className="rank-level">
                  <SolutionLevelDifficulty
                    level={solutionTaskData.task.requiredPoint.toString()}
                    difficulty={'task'}
                  />
                </div>
              </div>
            </div>
            <div className="actions">
              <Button
                buttonSize="small"
                styleType="secondary"
                label={t('ViewSource')}
                onClick={() =>
                  handleClickNewTab(solutionTaskData.github as string)
                }
              />

              <Button
                buttonSize="small"
                styleType="secondary"
                label={t('LivePreview')}
                onClick={() =>
                  handleClickNewTab(solutionTaskData.liveGithub as string)
                }
              />

              {/* <Button
                buttonSize="small"
                styleType="secondary"
                label="Feedback"
                onClick={() => setIsShowModal(true)}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SolutionTask;
