import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import 'swiper/scss';
import 'swiper/scss/grid';
import 'swiper/scss/pagination';
import { emptyChallenge } from '../../../../assets/images';
import { Button } from '../../../../components/common';
import EmptyComponent from '../../../../components/common/Empty/Empty';
import { paths } from '../../../../constant';
import solutionService from '../../../../services/solutionService';
import { useAuthStore } from '../../../../store/authStore';
import ChallengeIncomplete from '../ChallengeIncomplete/ChallengeIncomplete';
import './challengeIncompleteList.scss';

const ChallengeIncompleteList: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { profile, isAuthentication } = useAuthStore();
  const { isPending, data: responseIncompleteChallenge } = useQuery({
    queryKey: [paths.QUERY_KEY.solutionIncompleteChallenge, profile?.email],
    queryFn: async () => {
      if (!isAuthentication) {
        return;
      }
      const response = await solutionService.getIncompleteChallenge();
      const responseData = response.data;
      return {
        challenge: responseData?.data?.solutions || [],
        code1: responseData.code,
        message: responseData.message,
      };
    },
  });

  const challengeIncompleteListClass = classNames(
    'challenge__incomplete-list--component',
    {
      empty: responseIncompleteChallenge?.challenge.length === 0,
    },
  );

  return (
    <div className={challengeIncompleteListClass}>
      {isPending
        ? Array.from({ length: 6 }).map((_, index) => (
            <div className="skeleton__challenge" key={`${index}`}></div>
          ))
        : responseIncompleteChallenge?.challenge.map((challenge, index) => (
            <ChallengeIncomplete
              challengeId={challenge.challenge.id}
              key={`${index}`}
              className="challenge__incomplete"
              name={challenge.challenge.title}
              technicalList={challenge.challenge.technical}
              difficulty={challenge.challenge.requiredPoint}
              level={challenge.challenge.level}
              score={challenge.challenge.point}
              imageURL={challenge.challenge.image}
            />
          ))}
      {responseIncompleteChallenge?.challenge?.length === 0 && (
        <EmptyComponent
          pathImg={emptyChallenge}
          text={t('Empty.IncompleteChallenge')}
        >
          <Button
            styleType="secondary"
            label={t('Button.ViewMore.Challenges')}
            buttonSize="medium"
            style={{ width: '50%' }}
            onClick={() => {
              navigate(paths.challenges);
            }}
          />
        </EmptyComponent>
      )}
    </div>
  );
};

export default ChallengeIncompleteList;
