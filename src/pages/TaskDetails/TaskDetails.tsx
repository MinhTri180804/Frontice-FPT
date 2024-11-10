import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FAQ, Section } from '../../components/common';
import { TaskOverview } from '../../components/common/TaskOverview';
import { ConditionWrapper } from '../../components/wrapper';
import { paths } from '../../constant';
import taskService from '../../services/taskService';
import './taskDetails.scss';
import TaskDetailsDownload from './Partials/TaskDetailsDownload';
import TaskDetailsInformation from './Partials/TaskDetailsInformation';

const TaskDetailsPage: FC = () => {
  const [tabActive, setTabActive] = useState<number>(1);
  const { taskId } = useParams();
  const [isJoin, setIsJoin] = useState<boolean | null>(null);
  const [enoughPoint, setEnoughPoint] = useState<boolean | null>(null);
  const [isSubmit, setIsSubmit] = useState<boolean | null>(null);
  const [solutionId, setSolutionId] = useState<string | null>(null);
  const navigate = useNavigate();
  const changeTabActive = (tabId: number, disable: boolean) => {
    if (!disable) {
      setTabActive(tabId);
    }
  };

  console.log('TASK DETAILS ID: ', taskId);
  console.log(solutionId);

  const {
    data: taskDetailsData,
    isPending,
    refetch,
  } = useQuery({
    queryKey: [paths.QUERY_KEY.tasks, taskId],
    queryFn: async () => {
      if (!taskId) return;
      const response = await taskService.getDetails({ taskId });
      const responseData = response.data;
      setEnoughPoint(responseData.enoughPoint);
      setIsSubmit(responseData.isSubmit);
      setIsJoin(responseData.isJoin);
      setSolutionId(responseData.solutionSubmitId);
      return responseData;
    },
  });

  if (!taskId) {
    navigate(`${paths.home}`);
    return;
  }

  const handleEventClick = () => {
    refetch().then((response) => {
      if (response.data) {
        const responseData = response.data;
        setEnoughPoint(responseData.enoughPoint);
        setIsSubmit(responseData.isSubmit);
        setIsJoin(responseData.isJoin);
        setSolutionId(responseData.solutionSubmitId);
      }
    });
  };

  return (
    <div className="challenge__details-page">
      <div className="title">Task Details</div>
      <div className="content">
        <ConditionWrapper
          condition={!isPending}
          fallback={() => {
            return <div className="task-overview-skeleton"></div>;
          }}
        >
          {taskDetailsData && (
            <TaskOverview
              taskData={taskDetailsData}
              eventClick={handleEventClick}
            />
          )}
        </ConditionWrapper>

        <section className="tab__content-wrapper">
          <ul className="tab__list">
            <li
              onClick={() => changeTabActive(1, false)}
              className={`item ${tabActive === 1 && 'active'} `}
            >
              Information
            </li>

            <ConditionWrapper
              condition={
                !(isJoin === null && isSubmit === null && enoughPoint === null)
              }
              fallback={() => {
                return (
                  <>
                    <div className="tab__skeleton"></div>
                  </>
                );
              }}
            >
              <>
                <li
                  onClick={() => changeTabActive(2, isJoin === false)}
                  className={`item ${tabActive === 2 && 'active'} ${isJoin === false && 'disabled'} `}
                >
                  Download assets
                </li>
              </>
            </ConditionWrapper>
          </ul>

          <div className="content__of-tab">
            {tabActive === 1 && <TaskDetailsInformation />}
            {tabActive === 2 && <TaskDetailsDownload />}
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
      </div>
    </div>
  );
};

export default TaskDetailsPage;
