import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { paths } from '../../constant';
import taskService from '../../services/taskService';
import { SubmitSolutionForm } from './Partials';
import './submitSolutionTask.scss';
import { TaskOverview } from '../../components/common/TaskOverview';
import { ConditionWrapper } from '../../components/wrapper';

const SubmitSolutionTaskPage: FC = () => {
  const location = useLocation();
  const { taskId } = location.state;

  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: taskDetailsData, isPending } = useQuery({
    queryKey: [paths.QUERY_KEY.tasks, taskId],
    queryFn: async () => {
      if (!taskId) return;
      const response = await taskService.getDetails({ taskId });
      const responseData = response.data;
      return responseData;
    },
  });

  if (!taskId) {
    navigate(paths.notfound);
    return;
  }

  if (
    taskDetailsData &&
    !taskDetailsData.enoughPoint &&
    taskDetailsData.enoughPoint !== null
  ) {
    navigate(paths.home);
    return;
  }

  if (
    taskDetailsData &&
    taskDetailsData.isSubmit &&
    taskDetailsData.isJoin &&
    taskDetailsData.isSubmit !== null &&
    taskDetailsData.isJoin !== null
  ) {
    navigate(paths.home);
    return;
  }

  return (
    <div className="submit__solution-page">
      <div className="heading">{t('Page.SubmitSolution.Title')}</div>
      <div className="content">
        <ConditionWrapper
          condition={!isPending}
          fallback={() => <div className="task-overview-skeleton"></div>}
        >
          {taskDetailsData && (
            <TaskOverview taskData={taskDetailsData} eventClick={() => {}} />
          )}
        </ConditionWrapper>
        <section className="form__submit-solution">
          <div className="title">{t('Page.SubmitSolution.Form.Title')}</div>
          <SubmitSolutionForm taskId={taskId} />
        </section>
      </div>
    </div>
  );
};

export default SubmitSolutionTaskPage;
